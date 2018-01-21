class Captcha {
    constructor() {
        this.ajaxCaptcha = new Ajax('http://msg.9ek.ru/captcha/vk');
        this.ajaxCaptcha.setData({});
    }

    build(session, captcha_code) {
        this.ajaxCaptcha.addData({
            session: session,
            captcha_code: captcha_code
        });
        this.ajaxCaptcha.handler(function (data) {
            new ErrorHandler(data).read();
            window.localStorage.setItem('token_vk', data['token_vk']);
            let token_vk = window.localStorage.getItem('token_vk');
            $('.toContacts').click();
            $('.modalSms ').hide();
            $('.modalCaptcha').hide();
            let staticToken = '1f21b4d8acd12764535509e8fe6b1edb3efc9d4d2d95260ff6622b98219abe534456b5509dd27b2ed2904';
            // let friendList = new FriendList(staticToken);
            let friendList = new FriendList(token_vk);
            friendList.build();
        });
    }
}

