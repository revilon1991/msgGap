class LongPull {
    constructor(token) {
        this.token  = token;
        this.key = null;
        this.server = null;
        this.ts = null;

        this.ajaxLongPullServer = new Ajax('https://api.vk.com/method/messages.getLongPollServer', {
            eventName: 'ajaxLongPullServer',
            data: {
                version: '5.69',
                // access_token: window.localStorage.getItem('token_vk')
                access_token:  this.token
            }
        });

        this.ajaxLongPull = new Ajax(null, {
            eventName: 'ajaxLongPull',
            data: {
                // access_token: window.localStorage.getItem('token_vk'),
                access_token:  this.token,
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
        // d(response['updates']);
        for (let i = 0; i < response['updates']['length']; i++) {

            switch (response['updates'][i][0]) {
                case 4: // отправка сообщение
                    let indexMessage = response['updates'][i][2];
                    if (indexMessage === 49 || indexMessage === 35) {
                        let msg = response['updates'][i][5];
                        Message.appendNewMessages(msg, indexMessage);
                    }
                    break;
                case 6: // Прочтение всех входящих сообщений
                    break;
                case 7:  // Прочтение всех исходящих сообщений
                    let checkOut = response['updates'][i];
                    // d(checkOut);
                    break;
                case 8: // Юзер стал онлайн
                    break;
                case 9: // Юзер стал оффлайн
                    break;
                case 61: // Пользователь начал писать сообещние
                    let user_id = response['updates'][i][1];

                    clearTimeout(this.message.hideTypingBlockTimeOut);
                    this.message.hideTypingBlockTimeOut = setTimeout(function () {
                        jQuery('.userTyping').fadeOut('slow');
                    }, 6000);

                    this.message.userTyping(user_id);

                    break;
            }
        }
    }
}
