class LoginVk {
    static loginSubmitAction(authorization) {
        $.mobile.loading('show', {
            text: 'Загрузка...',
            textVisible: true,
            theme: 'b',
            html: '<div class="custom-loader"><i class="fa fa-spinner fa-spin"></i></div><h1>Загрузка...</h1>'
        });
        authorization.setCallback(function () {
            $.mobile.loading('hide');
        });
    }

    static loginErrorAction() {
        $.mobile.loading('hide');
        alert('Неверный логин/пароль');
    }

    static loginRenderAction() {
        $('body').pagecontainer('change', '#page_vk_login');
    }

    static smsSubmitAction(authorization) {
        $.mobile.loading('show', {
            text: 'Загрузка...',
            textVisible: true,
            theme: 'b',
            html: '<div class="custom-loader"><i class="fa fa-spinner fa-spin"></i></div><h1>Загрузка...</h1>'
        });
        authorization.setCallback(function () {
            $.mobile.loading('hide');
        });
    }

    static smsErrorAction() {
        $.mobile.loading('hide');
        alert('Неверный код из смс');
    }

    static smsRenderAction() {
        $('body').pagecontainer('change', '#page_vk_login_sms');
        rebuildFooter({
            vk: {href: '#page_vk_login', active: true},
        });
    }

    static captchaSubmitAction(authorization) {
        $.mobile.loading('show', {
            text: 'Загрузка...',
            textVisible: true,
            theme: 'b',
            html: '<div class="custom-loader"><i class="fa fa-spinner fa-spin"></i></div><h1>Загрузка...</h1>'
        });
        authorization.setCallback(function () {
            $.mobile.loading('hide');
        });
    }

    static captchaErrorAction() {
        $.mobile.loading('hide');
        alert('Неверный код с картинки');
    }

    static captchaRenderAction(imageBase64Captcha) {
        let imgCaptcha = "<img src='data:image/jpeg;base64," + imageBase64Captcha + "'/>",
            formCaptcha = $('#page-vk-login_captcha .image-captcha')
        ;
        formCaptcha.html(imgCaptcha);
        $('body').pagecontainer('change', '#page_vk_login_captcha');
        rebuildFooter({
            vk: {href: '#page_vk_login', active: true},
        });
    }

    static successRenderAction() {
        $('body').pagecontainer('change', '#page_vk_dialogs');
        rebuildFooter({
            vk: {href: '#page_vk_dialogs', active: true},
        });
    }
}