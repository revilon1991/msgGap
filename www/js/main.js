function d(arg) {
    console.log(arg);
}

jQuery(function ($) {

    // окно браузера
// var ref = cordova.InAppBrowser.open('https://twitter.github.io/typeahead.js/examples/', '_blank', 'location=yes');
// ref.addEventListener('loadstart', function(event) { alert(event.url); });
    //resume
    function check_token() {
        document.addEventListener("resume", function () {
            var token_vk = window.localStorage.getItem('token_vk');
            $.ajax({
                method: 'GET',
                url: 'http://msg.9ek.ru/check_token/vk',
                data: {
                    token_vk: token_vk
                },
                beforeSend: function () {
                },
                error: function (data) {
                },
                complete: function () {
                },
                success: function (data) {
                    var res = JSON.stringify(data);
                    d(res);
                    alert('Работа возоблена')
                }
            });
        });
    }
    check_token();
    // var authorization = new Authorization('revil-on@mail.ru', 'utihot62');
    // var user = new User(12143704, '3fb07fab0a48c3098b34b8f50114c8eb54c6e45059a6e3c0efae3833c54cbffa2731e6f84adb611b6498b');
    //
    //
    // authorization.getToken();

    // user.getHistory();
    var authorization = new Authorization('revil-on@mail.ru', 'utihot62');
    authorization.buildToken();

    var user = new User(12143704, authorization);
    user.getFriendList();



    $('.toContacts').on('click', function () {
        $('.loginPage').hide();
        $('.contactsPage').show();
    });
    $('.toAuthorize').on('click', function () {
        $('.loginPage').show();
        $('.contactsPage').hide();
    });





    function modalSmsSubmit() {
        $('.modalSmsSubmit').on('click', function () {
            var session = window.localStorage.getItem('session');
            var smsCode = $('#modalSmsBox').val();

            $.ajax({
                method: 'GET',
                url: 'http://msg.9ek.ru/sms/vk',
                data: {
                    sms_code: smsCode,
                    session: session
                },
                beforeSend: function () {
                },
                error: function (data) {
                },
                complete: function () {
                    $('.toContacts').click();
                    $('.submitData').prop("disabled", true);
                },
                success: function (data) {
                    if (data.status === 'captcha_checker') {
                        var captcha_img = data['image_base64_captcha'];
                        var img_capthca = "<img src='data:image/jpeg;base64," + captcha_img + "'/>";
                        $('.modalCaptcha').show().append(img_capthca);
                        $('.modalCaptchaSubmit').on('click', function () {
                            var captcha_code = $('#modalCaptchaBox').val();
                            $.ajax({
                                method: 'GET',
                                url: 'http://msg.9ek.ru/captcha/vk',
                                data: {
                                    session: session,
                                    captcha_code: captcha_code
                                },
                                beforeSend: function () {
                                },
                                error: function (data) {
                                },
                                complete: function () {
                                    $('.modalCaptchaSubmit').prop("disabled", true);
                                },
                                success: function (data) {
                                    window.localStorage.setItem('token_vk', data['token_vk']);
                                    var token_vk = window.localStorage.getItem('token_vk');
                                    $.ajax({
                                        method: 'GET',
                                        url: 'http://msg.9ek.ru/friendList/vk',
                                        data: {
                                            token_vk: token_vk
                                        },
                                        beforeSend: function () {
                                        },
                                        error: function (data) {
                                        },
                                        complete: function () {
                                        },
                                        success: function (data) {
                                            $('.toContacts').click();
                                            $('.modalSms ').hide();
                                            $('.modalCaptcha').hide();
                                            // getContactsPage(data);
                                        }
                                    });
                                }
                            });
                        });
                    }
                    else {
                        window.localStorage.setItem('token_vk', data['token_vk']);
                        var token_vk = window.localStorage.getItem('token_vk');
                        $('.modalSms ').hide();
                        $.ajax({
                            method: 'GET',
                            url: 'http://msg.9ek.ru/friendList/vk',
                            data: {
                                token_vk: token_vk
                            },
                            beforeSend: function () {
                            },
                            error: function (data) {
                            },
                            complete: function () {
                            },
                            success: function (data) {
                                // getContactsPage(data);
                            }
                        });
                    }
                }
            });
        });
    }

    function sendMessage() {
        $('.sendMessage').on('click', function () {
            var id = window.localStorage.getItem(user);
            var token_vk = window.localStorage.getItem('token_vk'),
                message = $('.textMessage').val();
            $.ajax({
                method: 'GET',
                url: 'http://msg.9ek.ru/send/vk',
                data: {
                    user_to: id,
                    message: message,
                    token_vk: token_vk
                },
                beforeSend: function () {
                },
                error: function (data) {
                },
                complete: function () {
                },
                success: function (data) {
                    $('.messagesChat').prepend('<div>' + data.message + '</div>');
                    $('.textMessage').val('');
                }
            });
        });
    }

    function submitData() {

        // if (login !== '' && password !== '') {
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            var element = document.getElementById('deviceProperties');
            element.innerHTML =
                'Device Platform: ' + device.platform + '<br />' +
                'Device UUID: '     + device.uuid     + '<br />' +
                'Device Version: '  + device.version  + '<br />';
        }
    }

    $('.submitData').on('click', function () {
        var login = $('#vk_login').val();
        var password = $('#vk_password').val();
        $.ajax({
            method: 'GET',
            url: 'http://msg.9ek.ru/login/vk',
            data: {
                // login: 'skaji.net1@mail.ru',
                login: login,
                // login: 'revil-on@mail.ru',
                // password: 'Gxgooccmg2',
                password: password,
                // password: 'utihot62',
                // platform:  device.platform,
                uuid: '0046438'
                // uuid: 'device.uuid'
                // version: version
            },
            beforeSend: function () {
            },
            error: function (data) {
            },
            complete: function () {
                $('.submitData').prop("disabled", true);
            },
            success: function (data) {
                // проверка смс
                window.localStorage.setItem('session', data['session']);
                window.localStorage.setItem('token_vk', data['token_vk']);
                var status_checker = data['status'];
                // если получено смс
                if (status_checker === 'sms_checker') {
                    $('.modalSms').show();
                    modalSmsSubmit();
                }
                // если без смс
                else if (status_checker === 'success') {
                    window.localStorage.setItem('token_vk', data['token_vk']);
                    var token_vk = window.localStorage.getItem('token_vk');
                    $('.toContacts').click();
                    // user.getFriendList();
                    // user.getLongPollServerForMessages();
                }
            }
        });
        // } else
        //     {
        //         alert('Введите логин/пароль');
        //     }
    });
    //
    function getHistory(id, token_vk) {
        $.ajax({
            method: 'GET',
            url: 'https://api.vk.com/method/messages.getHistory',
            data: {
                user_id: id,
                access_token: token_vk
            },
            beforeSend: function () {
            },
            error: function (data) {
            },
            complete: function () {
            },
            success: function (data) {
                //посчитать респонс даты, засунуть количество в i < это число
                for (var i = 1; i < 10; i++) {
                    var msg = data.response[i].body;
                    $('.messagesChat').prepend('<div>' + msg + '</div>');
                }
            }
        });
    }
    function getFour(res) {
        res.updates.forEach(function (item) {
            if (item[0] === 4) {
                var id = window.localStorage.getItem(item[3]),
                    token_vk = window.localStorage.getItem('token_vk');
                getHistory(id, token_vk);
            }
        });
    }

        $('.contact').on('click', '.contactWrapper', function () {
            var user = $(this).data('id');
            $('.contactsPage').hide();
            window.localStorage.setItem(user, user);
            var id = window.localStorage.getItem(user),
                token_vk = window.localStorage.getItem('token_vk');
            $('.chatPage').show();
            getHistory(id, token_vk);
            sendMessage();
        });
});
//1) ввести логин и пароль ->
//2)
// прием сообщений от сервера.
// последнее сообщение пользователя на странице контактов
// старт со страницы контактов для залогиненых пользователей
// разобрать все по функциям ajsx с использованием параметров
// дизейблить кнопки отправки нажатия
// не работает на айфоне заход в контакты, возможно дальше, хз
// аппендить чат