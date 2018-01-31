function d(arg) {
    console.log(arg);
}

let staticToken = '1f21b4d8acd12764535509e8fe6b1edb3efc9d4d2d95260ff6622b98219abe534456b5509dd27b2ed2904';
window.localStorage.setItem('token_vk', staticToken);
// 1f21b4d8acd12764535509e8fe6b1edb3efc9d4d2d95260ff6622b98219abe534456b5509dd27b2ed2904
jQuery(function ($) {
    $('.toContacts').on('click', function () {
        $('.window').hide();
        $('.contactsPage').show();
        $('.toContacts').hide();
        $('.toAuthorize').show();
        $('.toDialogs').show();
        $('.chatPage').hide();
        $('.textWrapper').hide();

        let friendList = new FriendList(staticToken);
        friendList.build();
    });
    $('.toAuthorize').on('click', function () {
        $('.window').hide();
        $('.loginPage').show();
        $('.toAuthorize').hide();
        $('.toContacts').show();
        $('.toDialogs').show();
        $('.chatPage').hide();
        $('.dialogList').show();
        $('.textWrapper').show();

    });
    $('.toDialogs').on('click', function () {
        $('.window').hide();
        $('.dialogsPage').show();
        $('.toDialogs').hide();
        $('.toContacts').show();
        $('.toAuthorize').show();
        $('.chatPage').hide();
        $('.dialogList').show();
        $('.textWrapper').show();

    });
    // 1) Залогинивание
    let authorization = new Authorization();
    let dialog = new Dialog('.dialogList');

    dialog.handle();

    // Диалоги
    document.addEventListener("deviceready", function() {
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

    // 2) получение списка друзей

    //
    getLongPoll(staticToken);
    //
    // // Получение информации о пользователе
    // let userInfo = new UserInfo(staticToken);
    // userInfo.take('12143704');

    // Проверка токена при возобновлении работы приложения
    document.addEventListener("resume", function () {
        authorization.checkToken();
    });
/////////////////////////////////////////////////////////////////////////////////////////////////



// Получение истории сообщений
    $('.window').on('click', '.sendWrapper', function () {
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
        messageHistory.build(window.localStorage.getItem(user));
    });
// Отправка сообщения в чат
    $('.sendMessage').on('click', function () {
        let id_dialog = $(this).closest('.chatPage').find('.sendWrapper').data('id-user');
        let token_vk = window.localStorage.getItem('token_vk'),
            message = $('.textMessage').val();
        let sendMessage = new SendMessage(staticToken);
        sendMessage.send(id_dialog, message);
    });


});



// var ref = cordova.InAppBrowser.open('https://twitter.github.io/typeahead.js/examples/', '_blank', 'location=yes');
// ref.addEventListener('loadstart', function(event) { alert(event.url); });