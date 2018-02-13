class Authorization {
    constructor() {
        this.statusChecker = false;
        this.token = false;
        this.session = false;
        this.imageBase64Captcha = false;
    }

    processLogin(login, password, uuid) {
        let ajaxAuthorization = new Ajax('http://msg.9ek.ru/login/vk');
        let authorization = this;

        ajaxAuthorization.setData({
            login: login,
            password: password,
            uuid: '9813908',
            // uuid: uuid
        });

        ajaxAuthorization.handler(function (data) {
            new ErrorHandler(data).read();

            authorization.saveData(data);

            authorization.handlerStatus();
        });
    }

    processSms(smsCode) {
        let ajaxAuthorization = new Ajax('http://msg.9ek.ru/sms/vk');
        let authorization = this;

        ajaxAuthorization.setData({
            session: this.session,
            sms_code: smsCode,
            // uuid: uuid
        });

        ajaxAuthorization.handler(function (data) {
            new ErrorHandler(data).read();

            authorization.saveData(data);

            authorization.handlerStatus();
        });
    }

    processCaptcha(captchaCode) {
        let ajaxAuthorization = new Ajax('http://msg.9ek.ru/captcha/vk');
        let authorization = this;

        ajaxAuthorization.setData({
            session: this.session,
            captcha_code: captchaCode,
            // uuid: uuid
        });

        ajaxAuthorization.handler(function (data) {
            new ErrorHandler(data).read();

            authorization.saveData(data);

            authorization.handlerStatus();
        });
    }

    handlerStatus() {
        switch (this.statusChecker) {
            case 'sms_checker':
                $('.modalSms').show();
                break;

            case 'captcha_checker':
                let imgCaptchca = "<img src='data:image/jpeg;base64," + this.imageBase64Captcha + "'/>";
                $('.modalSms').hide();
                $('.modalCaptcha').show().append(imgCaptchca);
                break;

            case 'success':
                window.localStorage.setItem('token_vk', this.token);
                $('.modalCaptcha').hide();
                $('.modalSms').hide();
                let friendList = new FriendList('.contact');
                friendList.handle();
                let dialog = new Dialog('.dialogList');
                dialog.handle();
                $('.window').hide();
                $('.dialogsPage').show();
                $('.toContacts').show();
                $('.toDialogs').show();
                break;
        }

        return this.statusChecker;
    }

    checkToken() {
        return new Ajax('http://msg.9ek.ru/check_token/vk', {
            eventName: 'ajaxCheckToken',
            data: {
                token_vk: window.localStorage.getItem('token_vk')
            }
        });
    }

    saveData(data) {
        this.statusChecker = data['status'] ? data['status'] : this.statusChecker;
        this.imageBase64Captcha = data['image_base64_captcha'] ? data['image_base64_captcha'] : this.imageBase64Captcha;
        this.session = data['session'] ? data['session'] : this.session;
        this.token = data['token_vk'] ? data['token_vk'] : this.token;
    }
}
