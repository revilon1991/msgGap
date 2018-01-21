function d(arg) {
    console.log(arg);
}

let staticToken = '1f21b4d8acd12764535509e8fe6b1edb3efc9d4d2d95260ff6622b98219abe534456b5509dd27b2ed2904';
// 1f21b4d8acd12764535509e8fe6b1edb3efc9d4d2d95260ff6622b98219abe534456b5509dd27b2ed2904
jQuery(function ($) {
    $('.toContacts').on('click', function () {
        $('.contactsPage').show();
        $('.dialogsPage').hide();
        $('.loginPage').hide();
    });
    $('.toAuthorize').on('click', function () {
        $('.loginPage').show();
        $('.contactsPage').hide();
        $('.dialogsPage').hide();
    });
    $('.toDialogs').on('click', function () {
        $('.loginPage').hide();
        $('.contactsPage').hide();
        $('.dialogsPage').show();
    });
    // 1) Залогинивание

    let ajax = new Ajax('http://msg.9ek.ru/login/vk');
    // let ajax = new Ajax('http://msg.9ek.ru/login/vk');
    let sms_checker = new Sms();
    let captcha = new Captcha();


    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        let element = document.getElementById('deviceProperties');
        element.innerHTML =
            'Device Platform: ' + device.platform + '<br />' +
            'Device UUID: ' + device.uuid + '<br />' +
            'Device Version: ' + device.version + '<br />';
    }
    $('.submitData').on('click', function () {
        let login = $('#vk_login').val();
        let password = $('#vk_password').val();
        if (login !== '' && password !== '') {
            ajax.setData({
                // login: 'revil-on@mail.ru',
                // password: 'utihot62',
                login: login,
                password: password,
                uuid: '9813908',
            });
            ajax.handler(function (data) {
                console.log(data);
                window.localStorage.setItem('session', data['session']);
                window.localStorage.setItem('token_vk', data['token_vk']);
                let status_checker = data['status'];
                if (status_checker === 'sms_checker') {
                    $('.modalSms').show();
                }
                else if (status_checker === 'success') {
                    let token_vk = window.localStorage.getItem('token_vk');
                    d(token_vk);
                    $('.toContacts').click();
                    let friendList = new FriendList(token_vk);
                    friendList.build();
                    // getLongPollServerForMessages(token_vk);

                }
            });
        }
    });
    $('.modalSmsSubmit').on('click', function () {
        let session = window.localStorage.getItem('session');
        let sms_code = $('#modalSmsBox').val();
        sms_checker.build(session, sms_code);
    });


    $('.modalCaptchaSubmit').on('click', function () {
        let session = window.localStorage.getItem('session');
        let captcha_code = $('#modalCaptchaBox').val();
        captcha.build(session, captcha_code);
    });

    // 2) получение списка друзей
    // let friendList = new FriendList(staticToken);
    // friendList.build();
    //
    // getLongPoll(staticToken);
    //
    // // Получение информации о пользователе
    // let userInfo = new UserInfo(staticToken);
    // userInfo.take('12143704');
/////////////////////////////////////////////////////////////////////////////////////////////////



// Получение истории сообщений
    $('.contact').on('click', '.contactWrapper', function () {
        let user = $(this).data('id');
        let clone = $(this).clone();
        $('.contactsPage').hide();
        window.localStorage.setItem(user, user);
        let id = window.localStorage.getItem(user),
            token_vk = window.localStorage.getItem('token_vk');
        $('.chatPage').show();
        $('.nameChat').append(clone);

        let messageHistory = new MessageHistory(staticToken);
        messageHistory.build(id);
    });

// Отправка сообщения в чат
    $('.sendMessage').on('click', function () {
        let id = $(this).closest('.chatPage').find('.contactWrapper').data('id');
        let token_vk = window.localStorage.getItem('token_vk'),
            message = $('.textMessage').val();

        let sendMessage = new SendMessage(staticToken);
        // sendMessage.send(id, message);
        sendMessage.send(id, message);
    });



});



// var ref = cordova.InAppBrowser.open('https://twitter.github.io/typeahead.js/examples/', '_blank', 'location=yes');
// ref.addEventListener('loadstart', function(event) { alert(event.url); });