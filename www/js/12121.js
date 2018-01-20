function sendMessage(id, message, token_vk) {
    let ajaxSendMessage = new Ajax('http://msg.9ek.ru/send/vk');

    ajaxSendMessage.setData({
        user_to: id,
        message: message,
        token_vk: token_vk
    });
    ajaxSendMessage.handler(function (data) {
        $('.messagesChat').append('<div>' + data.message + '</div>');
        $('.textMessage').val('');
    });
}
function getFriendList(token_vk) {
    let ajaxGetFriendList = new Ajax('http://msg.9ek.ru/friendList/vk');

    ajaxGetFriendList.setData({
        token_vk: token_vk
    });
    ajaxGetFriendList.handler(function (data) {
        for (let user of data.response.items) {
            // console.log(user);
            // user.first_name;
            // user.id;
            // user.last_name;
            // user.nickname;
            // user.domain;
            // user.last_seen;
            // user.photo_200_orig;
            // user.sex;
            let wrapper = '<div class="contactWrapper"  data-id="' + user.id +  '">' +
                '<div class="user-photo_wrapper"><img class="user-photo" src="'+ user.photo_200_orig + '" alt="'+ user.first_name + '"></div>' +
                '<div class="user-info">' +
                '<div class="user-first_name">' + user.first_name + '</div>' +
                '</div>' +
                '</div>';
            $('.contact').append(wrapper);

        }
    });

}
function getMessageHistory(id, token_vk) {
    let ajaxGetMessageHistory = new Ajax('https://api.vk.com/method/messages.getHistory');
    ajaxGetMessageHistory.setData({
        user_id: id,
        access_token: token_vk
    });
    ajaxGetMessageHistory.handler(function (data) {
        for (let i = 1; i < data.response.length; i++) {
            let msg = data.response[i].body;
            $('.messagesChat').prepend('<div >' + msg + '</div>');
        }
    });
}