class Sms {
    constructor() {
        this.ajaxSms = new Ajax('http://msg.9ek.ru/sms/vk');
    }
    build(session, sms_code) {
        this.ajaxSms.addData({
            session: session,
            sms_code: sms_code
        });
        this.ajaxSms.handler(function (data) {
            new ErrorHandler(data).read();
            if (data.status === 'captcha_checker') {
                let captcha_img = data['image_base64_captcha'];
                let img_capthca = "<img src='data:image/jpeg;base64," + captcha_img + "'/>";
                $('.modalCaptcha').show().append(img_capthca);
            } else {
                window.localStorage.setItem('token_vk', data['token_vk']);
                let token_vk = window.localStorage.getItem('token_vk');
                $('.modalSms ').hide();
                let staticToken = '1f21b4d8acd12764535509e8fe6b1edb3efc9d4d2d95260ff6622b98219abe534456b5509dd27b2ed2904';
                // let friendList = new FriendList(staticToken);
                let friendList = new FriendList(token_vk);
                friendList.build();
            }
        });
    }
}


