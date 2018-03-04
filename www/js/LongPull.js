class LongPull {
    constructor() {
        this.key = null;
        this.server = null;
        this.ts = null;

        this.ajaxLongPullServer = new Ajax('https://api.vk.com/method/messages.getLongPollServer', {
            eventName: 'ajaxLongPullServer',
            data: {
                version: '5.69',
                access_token: window.localStorage.getItem('token_vk')
            }
        });

        this.ajaxLongPull = new Ajax(null, {
            eventName: 'ajaxLongPull',
            data: {
                access_token: window.localStorage.getItem('token_vk'),
                act: 'a_check',
                wait: 5,
                mode: 8,
                version: 2
            }
        });

        this.injectDependencies();
    }

    injectDependencies() {
        this.message = new Message();
    }

    /**
     * Инициализация в виде расстановки листенеров для запросов
     */
    init() {
        let self = this;

        this.ajaxLongPullServer.handler();

        document.addEventListener(this.ajaxLongPullServer.event.type, function (e) {
            self.key = e.detail.response.response.key;
            self.server = e.detail.response.response.server;
            self.ts = e.detail.response.response.ts;

            self.process();
        }, false);

        document.addEventListener(this.ajaxLongPull.event.type, function (e) {
            let response = e.detail.response;

            if (e.detail.response.failed) {
                this.ajaxLongPullServer.handler();

                return;
            }

            self.ts = response.ts;

            self.handle(response);
            self.process();
        }, false);
    }

    /**
     * Опрос longPull сервера
     */
    process() {
        this.ajaxLongPull.setApi('https://' + this.server);
        this.ajaxLongPull.addData({
            ts: this.ts,
            key: this.key,
        });

        this.ajaxLongPull.handler();
    }

    /**
     * Разбор ответа от longPull сервера
     * @param response
     */
    handle(response) {
        for (let i = 0; i < response['updates']['length']; i++) {

            switch (response['updates'][i][0]) {
                case 4: // отправка сообщения
                    let message = response['updates'][i][5],
                        formatMessage,
                        messageId = response['updates'][i][1],
                        indexMessage = response['updates'][i][2]
                    ;

                    // https://ru.stackoverflow.com/questions/631007/%D0%A4%D0%BB%D0%B0%D0%B3%D0%B8-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9-vk-api
                    if (!!(indexMessage & 2)) {
                        formatMessage = 'sentMessage';
                    } else {
                        formatMessage = 'receivedMessage';
                    }
                    ChatVk.appendNewMessages(message, messageId, formatMessage);
                    ChatVk.enterChatScrollBottomAction();
                    break;
                case 6: // Пользователь приложения прочитал все входящие сообщения
                    ChatVk.removeFlagUnread('receivedMessage');
                    break;
                case 7:  // Собеседник прочитал все сообщения отправленные пользователем приложения
                    ChatVk.removeFlagUnread('sentMessage');
                    break;
                case 8: // Юзер стал онлайн
                    ChatVk.setUserStatus('online');
                    break;
                case 9: // Юзер стал оффлайн
                    ChatVk.setUserStatus('offline');
                    break;
                case 61: // Пользователь начал писать сообещние
                    clearTimeout(this.message.hideTypingBlockTimeOut);
                    this.message.hideTypingBlockTimeOut = setTimeout(function () {
                        ChatVk.setUserStatus('end-typing');
                    }, 6000);
                    ChatVk.setUserStatus('start-typing');

                    // for dialogs
                    // let user_id = response['updates'][i][1];
                    // let userObject = $('[data-id-user=' + user_id + ']');
                    // let userInfo = new UserInfo('message');
                    // userInfo.take(user_id);
                    // document.addEventListener(userInfo.ajaxUserInfo.event.type, function (e) {
                    //     let userName = e.detail.response.response[0]['first_name'];
                    //     userObject.find('.userTyping').text(userName + ' пишет...').fadeIn('slow');
                    // }, false);

                    break;
            }
        }
    }
}
