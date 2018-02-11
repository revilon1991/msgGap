class FriendList {
    constructor(friendSelector) {
        this.friendBlock = document.querySelector(friendSelector);
        this.data = null;
        this.friendList = null;

        this.ajaxFriend = new Ajax('http://msg.9ek.ru/friendList/vk', {
            eventName: 'ajaxFriend',
            data: {
                token_vk: window.localStorage.getItem('token_vk')
            }
        });

        this.handleEventSystem();
    }
    handle() {
        this.ajaxFriend.handler();
    }
    renderHtml(friendBlock) {
        for (let i = 0; i < this.friendList.length; i++) {
            let friend = this.friendList[i];

            if (!(friend instanceof Object)) {
                continue;
            }

            let contactWrapper = document.createElement('div'),
                userPhotoWrapper = document.createElement('div'),
                userTyping = document.createElement('div'),
                textBlockWrapper = document.createElement('div'),
                userPhoto = document.createElement('img'),
                userName = document.createElement('div'),
                date = document.createElement('div'),
                userInformation = document.createElement('div')
            ;

            contactWrapper.className = 'contactWrapper sendWrapper';
            userPhotoWrapper.className = 'photoWrapper';
            textBlockWrapper.className = 'textWrapper';
            userPhoto.className = 'photo';
            userInformation.className = 'information';
            userName.className = 'userName';
            date.className = 'date';

            userTyping.className = 'userTyping';
            contactWrapper.setAttribute('data-id-user', friend['id']);
            let userLastSeen = null;
            if ('userInfo' in friend) {
                userPhoto.src = friend.userInfo['photo_200_orig'];
                userName.innerHTML = friend.userInfo['first_name'] + ' ' + friend.userInfo['last_name'];
                if ('last_seen' in friend.userInfo) {
                    userLastSeen = new Date(friend.userInfo['last_seen']['time'] * 1000);
                    let userLastSeenToday =  window.moment(userLastSeen).format('HH:mm');
                    let userLastSeenYesterday =  window.moment(userLastSeen).format('HH:mm');
                    let userLastSeenLate =  window.moment(userLastSeen).format('DD.MM.YYYY');
                    let now = new Date();
                    let time = Date.now();
                    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
                    // d(friend.userInfo['last_seen']['time'] * 1000);
                    // d(time);
                    if (userLastSeen < today - 86400000) {
                        userLastSeen = userLastSeenLate;
                    } else if (userLastSeen < today) {
                        userLastSeen = 'вчера в ' + userLastSeenYesterday;
                    }  else if (friend.userInfo['last_seen']['time'] * 1000 + 300000 >= time  ) {
                        userLastSeen = 'online'
                    } else {
                        userLastSeen = userLastSeenToday
                    }
                }
            }
            date.innerHTML = userLastSeen;
            userPhotoWrapper.appendChild(userPhoto);
            textBlockWrapper.appendChild(userInformation);
            userInformation.appendChild(userName);
            userInformation.appendChild(date);
            contactWrapper.appendChild(userPhotoWrapper);
            contactWrapper.appendChild(textBlockWrapper);
            contactWrapper.appendChild(userTyping);
            friendBlock.appendChild(contactWrapper);
        }
    }
    handleEventSystem() {
        let self = this;
        let ajaxFriend = this.ajaxFriend;
        let userInfo = new UserInfo('friendList');

        document.addEventListener(this.ajaxFriend.event.type, function (e) {
            let friendList = e.detail.response.response.items;
            let userIdList = [];

            for (let friend of friendList) {
                userIdList.push(friend.id);
            }

            userInfo.take(userIdList);
        }, false);
        document.addEventListener(userInfo.ajaxUserInfo.event.type, function (e) {
            self.friendList = FriendList.hydrationData(ajaxFriend.response.response.items, e.detail.response);
            self.renderHtml(self.friendBlock)
        }, false);
    }
    static hydrationData(responseFriend, responseUserInfo) {
        let friendList = responseFriend;
        let userInfoListFriend = responseUserInfo.response;
        for (let i = 0; i < friendList.length; i++) {
            if (!(friendList[i] instanceof Object)) {
                continue;
            }
            for (let b = 0; b < userInfoListFriend.length; b++) {
                if (friendList[i]['id'] === userInfoListFriend[b]['uid']) {
                    friendList[i]['userInfo'] = userInfoListFriend[b];
                }
            }
        }
        return friendList;
    }
}
