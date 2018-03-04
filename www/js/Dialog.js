class Dialog {
    constructor(dialogSelector) {
        this.dialogBlock = document.querySelector(dialogSelector);
        this.data = null;
        this.dialogList = null;

        this.ajaxDialog = new Ajax('https://api.vk.com/method/messages.getDialogs', {
            eventName: 'ajaxDialog',
            data: {
                count: 99,
                access_token: window.localStorage.getItem('token_vk'),
                version: '5.69'
            }
        });

        this.handleEventSystem();
    }

    /**
     * Запуск процессинга диалогов,
     * последовательные ajax запросы с последующей подготовкой списка диалогов для рендеренга
     */
    handle(callable) {
        this.ajaxDialog.handler(callable);
    }

    /**
     * Билд html из подготовленных данных диалогов
     */
    renderHtml(dialogBlock) {
        for (let i = 0; i < this.dialogList.length; i++) {
            let dialog = this.dialogList[i];

            if (!(dialog instanceof Object)) {
                continue;
            }

            let dialogWrapper = document.createElement('div'),
                userPhotoWrapper = document.createElement('div'),
                userTyping = document.createElement('div'),
                textBlockWrapper = document.createElement('div'),
                userPhoto = document.createElement('img'),
                userName = document.createElement('div'),
                message = document.createElement('div'),
                date = document.createElement('div'),
                userInformation = document.createElement('div')
            ;

            dialogWrapper.className = 'button dialogWrapper sendWrapper';
            userPhotoWrapper.className = 'photoWrapper';
            textBlockWrapper.className = 'textWrapper';
            userPhoto.className = 'photo';
            userInformation.className = 'information';
            userName.className = 'userName';
            date.className = 'date';

            message.className = 'message';
            userTyping.className = 'userTyping';

            dialogWrapper.setAttribute('data-id-user', dialog['uid']);
            if ('userInfo' in dialog) {
                userPhoto.src = dialog.userInfo['photo_200_orig'];
                userName.innerHTML = dialog.userInfo['first_name'] + ' ' + dialog.userInfo['last_name'];
            }
            let slicedMessage = dialog.body.replace(/<br>/gi, ' ').slice(0,60);
            if (slicedMessage.length < dialog.body.length) {
                slicedMessage += '...';
            }
            message.innerHTML = slicedMessage;
            let dateMessage = new Date(dialog.date * 1000);
            let getHours = dateMessage.getHours();
            let getMinutes = dateMessage.getMinutes();
            let dateMessageWithoutTime =  window.moment(dateMessage).format('DD.MM.YYYY');
            let now = new Date();
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
            let other = new Date(dialog.date * 1000);
            if (other < today - 86400000) {
                other = dateMessageWithoutTime;
            } else if (other < today) {
                other = 'вчера';
            } else {
               other = getHours + ':' + getMinutes;
            }
            date.innerHTML = other;
            userPhotoWrapper.appendChild(userPhoto);
            textBlockWrapper.appendChild(userInformation);
            userInformation.appendChild(userName);
            userInformation.appendChild(date);
            textBlockWrapper.appendChild(message);
            dialogWrapper.appendChild(userPhotoWrapper);
            dialogWrapper.appendChild(textBlockWrapper);
            dialogWrapper.appendChild(userTyping);
            dialogBlock.appendChild(dialogWrapper);
        }
    }

    /**
     * Система эвентов, для корректной передачи данных между разными ajax запросами
     */
    handleEventSystem() {
        let self = this;
        let ajaxDialog = this.ajaxDialog;
        let userInfo = new UserInfo('dialog');

        document.addEventListener(this.ajaxDialog.event.type, function (e) {
            let dialogList = e.detail.response.response;
            let userIdList = [];

            dialogList.forEach(function (dialog) {
                userIdList.push(dialog.uid)
            });

            userInfo.take(userIdList);
        }, false);
        document.addEventListener(userInfo.ajaxUserInfo.event.type, function (e) {
            self.dialogList = Dialog.hydrationData(ajaxDialog.response, e.detail.response);
            self.renderHtml(self.dialogBlock)
        }, false);
    }

    /**
     * Оживление респонса списка диалогов используя респонс UserInfo
     * т.е. наполнение массива диалогов данными от пользователей
     * @param responseDialog
     * @param responseUserInfo
     * @returns {*|null|Object}
     */
    static hydrationData(responseDialog, responseUserInfo) {
        let dialogList = responseDialog.response;
        let userInfoList = responseUserInfo.response;
        for (let i = 0; i < dialogList.length; i++) {
            if (!(dialogList[i] instanceof Object)) {
                continue;
            }
            for (let b = 0; b < userInfoList.length; b++) {
                if (dialogList[i]['uid'] === userInfoList[b]['uid']) {
                    dialogList[i]['userInfo'] = userInfoList[b];
                }
            }
        }

        return dialogList;
    }
}
