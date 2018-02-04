function d(arg) {
    console.log(arg);
}

// let staticToken = 'e261e944e9df62f776f7f8240fd5fe4bfa17f601f64f3563f27a77f0ba5a099e3c21d0e0d75987dc0bfdf';
window.localStorage.setItem('token_vk', 'noToken');
// window.localStorage.setItem('token_vk', staticToken);

jQuery(function ($) {
    $('.toContacts').on('click', function () {
        $('.window').hide();
        $('.contactsPage').show();
        $('.toContacts').hide();
        // $('.toAuthorize').show();
        $('.toDialogs').show();
        $('.chatPage').hide();
        $('.textWrapper').hide();

    });
    // $('.toAuthorize').on('click', function () {
    //     $('.window').hide();
    //     $('.loginPage').show();
    //     $('.toAuthorize').hide();
    //     $('.toContacts').show();
    //     $('.toDialogs').show();
    //     $('.chatPage').hide();
    //     $('.dialogList').show();
    //     $('.textWrapper').show();
    // });

    $('.toDialogs').on('click', function () {
        $('.window').hide();
        $('.dialogsPage').show();
        $('.toDialogs').hide();
        $('.toContacts').show();
        // $('.toAuthorize').show();
        $('.chatPage').hide();
        $('.dialogList').show();
        $('.textWrapper').show();

    });
    // 1)
    let authorization = new Authorization();




    // Long Pull
    let longPull = new LongPull(window.localStorage.getItem('token_vk'));
    longPull.init();

    // // Получение информации о пользователе
    // let userInfo = new UserInfo(staticToken);
    // userInfo.take('12143704');

    // Проверка токена при возобновлении работы приложения
    document.addEventListener("resume", function () {
        authorization.checkToken();
    });

    // Диалоги
    document.addEventListener("deviceready", function () {
        authorization.checkToken();
        let device = window.device,
            element = document.getElementById('deviceProperties');

        element.innerHTML =
            'Device Model: '    + device.model    + '<br />' +
            'Device Cordova: '  + device.cordova  + '<br />' +
            'Device Platform: ' + device.platform + '<br />' +
            'Device UUID: '     + device.uuid     + '<br />' +
            'Device Version: '  + device.version  + '<br />';
    }, false);

    $('.submitData').on('click', function () {
        let login = $('#vk_login').val();
        let password = $('#vk_password').val();
        // authorization.processLogin('revil-on@mail.ru', 'utihot62');
        authorization.processLogin(login, password);
    });

    $('.modalSmsSubmit').on('click', function () {
        let smsCode = $('#modalSmsBox').val();
        authorization.processSms(smsCode);
    });

    $('.modalCaptchaSubmit').on('click', function () {
        let captchaCode = $('#modalCaptchaBox').val();
        authorization.processCaptcha(captchaCode);
    });

// Получение истории сообщений
    $('.window').on('click', '.sendWrapper', function () {
        $('.toDialogs').show();
        $('.toContacts').show();

        $('.messagesChat').html('');
        let clone = $(this).clone();
        $('.nameChat').html(clone);
        let user = $(this).data('id-user');
        window.localStorage.setItem(user, user);
        let token_vk = window.localStorage.getItem('token_vk');

        let collectionHide = $()
            .add('.dialogList')
            .add('.contactsPage')
            .add('.dialogPage')
            .add('.textWrapper')
        ;
        let collectionShow = $()
            .add('.chatPage')
        ;
        collectionHide.hide();
        collectionShow.show();

        // let messageHistory = new MessageHistory(staticToken);
        let messageHistory = new MessageHistory(token_vk);
        messageHistory.build(window.localStorage.getItem(user));
    });
// Отправка сообщения в чат
    $('.sendMessage').on('click', function () {
        let id_dialog = $(this).closest('.chatPage').find('.sendWrapper').data('id-user');
        // let token_vk = window.localStorage.getItem('token_vk'),
        let messageText = $('.textMessage').val();
        let message = new Message();
        message.send(id_dialog, messageText);
    });

});


// var ref = cordova.InAppBrowser.open('https://twitter.github.io/typeahead.js/examples/', '_blank', 'location=yes');
// ref.addEventListener('loadstart', function(event) { alert(event.url); });