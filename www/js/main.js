function d(arg) {
    console.log(arg);
}

let staticToken = 'e82a9109150f70295d08aa668bfe794b4e8f36d18b57e7311064a5646b150c231beec3c76404f41e9f33a';
// window.localStorage.setItem('token_vk', 'noToken');
window.localStorage.setItem('token_vk', staticToken);


jQuery(function ($) {
    $('.toContacts').on('click', function () {
        $('.window').hide();
        $('.contactsPage').show();
        $('.toContacts').hide();
        // $('.toAuthorize').show();
        $('.toDialogs').show();
        $('.chatPage').hide();
        // $('.textWrapper').hide();

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
        // $('.textWrapper').show();

    });
    // 1)
    let authorization = new Authorization();
    let dialog = new Dialog('.dialogList');
    let friendList = new FriendList('.contact');
    let ajaxCheckToken = authorization.checkToken();

    let getToken = new GetToken('lol-kek-hah');
    getToken.getToken();








    // Long Pull
    let longPull = new LongPull();
    longPull.init();

    // // Получение информации о пользователе
    // let userInfo = new UserInfo(staticToken);
    // userInfo.take('12143704');

    // Проверка токена при возобновлении работы приложения
    document.addEventListener('resume', function () {

        ajaxCheckToken.handler(function (data) {
            switch (data.status) {
                case 'success':
                    d('Токен в порядке');
                    dialog.handle();
                    friendList.handle();
                    $('.window').hide();
                    $('.dialogsPage').show();
                    $('.toContacts').show();
                    $('.toDialogs').show();
                    break;
                case 'error':
                    d('Токен протух');
                    $('.window').hide();
                    $('.toContacts').hide();
                    $('.toDialogs').hide();
                    $('.loginPage').show();
                    break;
            }
        });
    });

    // window.addEventListener('keyboardDidShow', (ev) => {
    //     // Describe your logic which will be run each time when keyboard is about to be shown.
    //     alert('hi');
    // });

    // Диалоги
    document.addEventListener("deviceready", function () {
        // setInterval(function () {
        //     // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //     // cordova.plugins.Keyboard.hideFormAccessoryBar(true);
        //     Keyboard.hideKeyboardAccessoryBar(true)
        //     // Keyboard.hide();
        // }, 1000);

        // ajaxCheckToken.handler(function (data) {
        //     switch (data.status) {
        //         case 'success':
        //             d('Токен в порядке');
        //             dialog.handle();
        //             friendList.handle();
        //             $('.window').hide();
        //             $('.dialogsPage').show();
        //             $('.toContacts').show();
        //             $('.toDialogs').show();
        //             break;
        //         case 'error':
        //             d('Токен протух');
        //             $('.window').hide();
        //             $('.toContacts').hide();
        //             $('.toDialogs').hide();
        //             $('.loginPage').show();
        //             break;
        //     }
        // });

        let device = window.device,
            element = document.getElementById('deviceProperties');
        element.innerHTML =
            'Device Model: '    + device.model    + '<br />' +
            'Device Cordova: '  + device.cordova  + '<br />' +
            'Device Platform: ' + device.platform + '<br />' +
            'Device UUID: '     + device.uuid     + '<br />' +
            'Device Version: '  + device.version  + '<br />';
        window.localStorage.setItem('uuid', device.uuid);
    }, false);

    $('.submitData').on('click', function () {
        // let login = $('#vk_login').val();
        // let password = $('#vk_password').val();
        // let uuid = window.localStorage.getItem('uuid');
        authorization.processLogin('revil-on@mail.ru', 'utihot62');
        // authorization.processLogin(login, password, uuid);
    });

    $('.modalSmsSubmit').on('click', function () {
        let smsCode = $('#modalSmsBox').val();
        // let uuid = window.localStorage.getItem('uuid');
        authorization.processSms(smsCode);
        // authorization.processSms(smsCode, uuid);
    });

    $('.modalCaptchaSubmit').on('click', function () {
        let captchaCode = $('#modalCaptchaBox').val();
        // let uuid = window.localStorage.getItem('uuid');
        authorization.processCaptcha(captchaCode);
        // authorization.processCaptcha(captchaCode, uuid);
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

        let messageHistory = new MessageHistory(staticToken);
        // let messageHistory = new MessageHistory(token_vk);
        messageHistory.build(window.localStorage.getItem(user));
    });
// Отправка сообщения в чат
    $('.sendMessage').on('click', function () {
        let id_dialog = $(this).closest('.chatPage').find('.sendWrapper').data('id-user');
        // let token_vk = window.localStorage.getItem('token_vk'),
        let messageText = $('.textMessage').val();
        // let message = new Message();
        let message = new Message(staticToken);
        message.send(id_dialog, messageText);
    });

});


// var ref = cordova.InAppBrowser.open('https://twitter.github.io/typeahead.js/examples/', '_blank', 'location=yes');
// ref.addEventListener('loadstart', function(event) { alert(event.url); });