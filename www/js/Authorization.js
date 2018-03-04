class Authorization {
    constructor() {
        this.statusChecker = false;
        this.token = false;
        this.migration = false;
        this.imageBase64Captcha = false;
        this.callback = null;
    }

    processLogin(login, password, uuid) {
        let ajaxAuthorization = new Ajax('http://msg.9ek.ru/login/vk');
        let authorization = this;

        ajaxAuthorization.setData({
            login: login,
            password: password,
            uuid: uuid
        });

        ajaxAuthorization.setErrorHandler(function (data) {
            console.error(data);
            LoginVk.loginErrorAction();
        });

        ajaxAuthorization.handler(function (data) {
            new ErrorHandler(data).read();

            authorization.saveData(data);

            authorization.handlerStatus();
        });

        ajaxAuthorization.setPostLoader(this.callback);
    }

    processSms(smsCode, uuid) {
        let ajaxAuthorization = new Ajax('http://msg.9ek.ru/sms/vk');
        let authorization = this;

        ajaxAuthorization.setData({
            migration: this.migration,
            sms_code: smsCode,
            uuid: uuid
        });

        ajaxAuthorization.setErrorHandler(function (data) {
            console.error(data);
            alert(JSON.stringify(data));
            LoginVk.smsErrorAction();
        });

        ajaxAuthorization.handler(function (data) {
            new ErrorHandler(data).read();

            authorization.saveData(data);

            authorization.handlerStatus();
        });

        ajaxAuthorization.setPostLoader(this.callback);
    }

    processCaptcha(captchaCode) {
        let ajaxAuthorization = new Ajax('http://msg.9ek.ru/captcha/vk');
        let authorization = this;

        ajaxAuthorization.setData({
            migration: this.migration,
            captcha_code: captchaCode,
            uuid: uuid
        });

        ajaxAuthorization.setErrorHandler(function (data) {
            console.error(data);
            LoginVk.captchaErrorAction();
        });

        ajaxAuthorization.handler(function (data) {
            new ErrorHandler(data).read();

            authorization.saveData(data);

            authorization.handlerStatus();
        });

        ajaxAuthorization.setPostLoader(this.callback);
    }

    handlerStatus() {
        console.log(this.statusChecker);
        switch (this.statusChecker) {
            case 'sms_checker':
                LoginVk.smsRenderAction();
                break;

            case 'captcha_checker':
                LoginVk.captchaRenderAction(this.imageBase64Captcha);
                break;

            case 'success':
                window.localStorage.setItem('token_vk', this.token);
                // let friendList = new FriendList('.contact');
                let dialog = new Dialog('#page_vk_dialogs .dialog-list');

                // friendList.handle();
                dialog.handle();

                LoginVk.successRenderAction();
                break;
        }

        return this.statusChecker;
    }

    static checkToken(token) {
        return new Ajax('http://msg.9ek.ru/check_token/vk', {
            eventName: 'ajaxCheckToken',
            data: {
                token_vk: token
            }
        });
    }

    static getToken(uuid) {
        return new Ajax('http://msg.9ek.ru/get_token/vk', {
            eventName: 'ajaxGetToken',
            data: {
                uuid: uuid
            }
        });
    }

    saveData(data) {
        this.statusChecker = data['status'] ? data['status'] : this.statusChecker;
        this.imageBase64Captcha = data['image_base64_captcha'] ? data['image_base64_captcha'] : this.imageBase64Captcha;
        this.migration = data['migrate_data_vk'] ? data['migrate_data_vk'] : this.migration;
        this.token = data['token_vk'] ? data['token_vk'] : this.token;
    }

    setCallback(callable) {
        this.callback = callable;
    }
}
