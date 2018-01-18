function d(arg) {
    console.log(arg);
}

jQuery(function ($) {
    $('.toContacts').on('click', function () {
        $('.loginPage').hide();
        $('.contactsPage').show();
    });
    $('.toAuthorize').on('click', function () {
        $('.loginPage').show();
        $('.contactsPage').hide();
    });



    let ajax = new Ajax('login/vk');
    //1) Залогинивание
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
                    $('.toContacts').click();
                    getFriendList(token_vk);
                }
            });

        }
    });
    getFriendList('9d385300c31b0f21a5597ede2e78343585e62f0bc1cec525ff48df9f428382616164c2dde82637a07eb2d');

    //рабочий токен
//9d385300c31b0f21a5597ede2e78343585e62f0bc1cec525ff48df9f428382616164c2dde82637a07eb2d
    // session
// gks288ed29kvp5386dgbsi50lm


/////////////////////////////////////////////////////////////////////////////////////////////////


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
                d(data.response.length);
                // посчитать респонс даты, засунуть количество в i < это число
                for (let i = 1; i < data.response.length; i++) {
                    let msg = data.response[i].body;
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
        let user = $(this).data('id');
        $('.contactsPage').hide();
        window.localStorage.setItem(user, user);
        let id = window.localStorage.getItem(user),
            token_vk = window.localStorage.getItem('token_vk');
        $('.chatPage').show();
        getHistory(id, token_vk);
    });
});


// var ref = cordova.InAppBrowser.open('https://twitter.github.io/typeahead.js/examples/', '_blank', 'location=yes');
// ref.addEventListener('loadstart', function(event) { alert(event.url); });