class Dialog {
    constructor(dialogSelector) {
        this.dialogBlock = document.querySelector(dialogSelector);
        this.data = null;
        this.dialogList = null;

        this.ajaxDialog = new Ajax('https://api.vk.com/method/messages.getDialogs', {
            eventName: 'ajaxDialog',
            data: {
                count: 99,
                version: '5.69',
                access_token: window.localStorage.getItem('token_vk')
            }
        });

        this.handleEventSystem();
    }

    /**
     * Запуск процессинга диалогов,
     * последовательные ajax запросы с последующей подготовкой списка диалогов для рендеренга
     */
    handle() {
        this.ajaxDialog.handler();
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
                textBlockWrapper = document.createElement('div'),
                userPhoto = document.createElement('img'),
                userName = document.createElement('div'),
                message = document.createElement('div'),
                date = document.createElement('div')
            ;

            dialogWrapper.className = 'dialogWrapper';
            userPhotoWrapper.className = 'photoWrapper';
            textBlockWrapper.className = 'textWrapper';
            userPhoto.className = 'photo';
            userName.className = 'userName';
            message.className = 'message';
            date.className = 'date';

            dialogWrapper.setAttribute('data-id-user', dialog['uid']);
            userPhoto.src = dialog.userInfo['photo_200_orig'];
            userName.innerHTML = dialog.userInfo['first_name'] + ' ' + dialog.userInfo['last_name'];
            message.innerHTML = dialog.body;
            let dateMessage = new Date(dialog.date * 1000);
            date.innerHTML = dateMessage.toLocaleString();

            userPhotoWrapper.appendChild(userPhoto);
            textBlockWrapper.appendChild(userName);
            textBlockWrapper.appendChild(date);
            textBlockWrapper.appendChild(message);
            dialogWrapper.appendChild(userPhotoWrapper);
            dialogWrapper.appendChild(textBlockWrapper);

            dialogBlock.appendChild(dialogWrapper);
        }
    }

    /**
     * Система эвентов, для корректной передачи данных между разными ajax запросами
     */
    handleEventSystem() {
        let self = this;
        let ajaxDialog = this.ajaxDialog;
        let userInfo = new UserInfo();

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
