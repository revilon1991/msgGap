var request = 'http://msg.9ek.ru/';
jQuery(function ($){
    $('#login-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: this.method,
            url: request,
            data: $(this).serialize(),
            beforeSend: function () {

            },
            success: function (data) {

            },
            error: function (data) {

            },
            complete: function () {

            }
        });
    });
});
jQuery(function ($){
    $('#send-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: this.method,
            url: request + 'send',
            data: $(this).serialize(),
            beforeSend: function () {

            },
            success: function (data) {

            },
            error: function (data) {

            },
            complete: function () {

            }
        });
    });
});
jQuery(function ($){
    $('.check_password').click(function(){
        var input = $(this).closest('.login-page_password').find('input.password');
        if(input.attr("type") === "password"){
            input.attr("type","text");
        }else{
            input.attr("type","password");
        }
    });
    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };
    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    $('.search .typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'states',
            source: substringMatcher(states)
        });
});
jQuery(function ($){
    $('.toContacts').on('click', function () {
        $('.loginPage').hide();
        $('.contactsPage').show();
    });
    $('.toAuthorize').on('click', function () {
        $('.loginPage').show();
        $('.contactsPage').hide();
    });
    $('.toAuthorize').on('click', function () {
        $('.loginPage').show();
        $('.contactsPage').hide();
    });

    $('.vk_submit').find('input[name*="vk_submit"]').on('click', function () {

    });
});
function d(arg) {
    console.log(arg);
}
function getContactsPage (data) {
    // var obj = JSON.parse(data);
    $.each(data.response.items, function (index, value) {
        var contactPicture = '<div class="contactPicture" style="background-image:url(' + value.photo_200_orig + ')"></div>';
        var contactInfo  =
            '<div class="contactInfo">'
            + '<div class="contactName">'
            + value.first_name
            + '</div>'
            +  '<div class="contactLastSeen">'
            + value.last_name
            + '</div>'
                +  '<div class="contactId" data-id="'
            + value.id
            + '">'
            + '</div>'
            + '</div>';
        $('.contact').append('<div class="contactWrapper" data-id="' +  value.id + '">' + contactPicture + contactInfo +  '</div>');
    });
}
// окно браузера
// var ref = cordova.InAppBrowser.open('https://twitter.github.io/typeahead.js/examples/', '_blank', 'location=yes');
// ref.addEventListener('loadstart', function(event) { alert(event.url); });
//1)
jQuery(function ($){
//экран логина
    $('.submitData').on('click', function() {
        var login = $('input#vk_login').val();
        var password = $('input#vk_password').val();
        // if (login !== '' && password !== '') {
            document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                var element = document.getElementById('deviceProperties');
                element.innerHTML =
                    'Device Platform: ' + device.platform + '<br />' +
                    'Device UUID: '     + device.uuid     + '<br />' +
                    'Device Version: '  + device.version  + '<br />';
            }
            $.ajax({
                method: 'GET',
                url: 'http://msg.9ek.ru/login/vk',
                data: {
                    // login: 'skaji.net1@mail.ru',
                    login: 'revil-on@mail.ru',
                    // password: 'Gxgooccmg2',
                    password: 'utihot62',
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
                    $('.submitData').prop( "disabled", true );
                },
                success: function (data) {
                    window.localStorage.setItem('session', data['session']);
                    window.localStorage.setItem('token_vk', data['token_vk']);
                    var sms_checker = data['status'];

                    //если получено смс
                    if (sms_checker === 'sms_checker') {
                        $('.modalSms').show();
                    }

                    // если без смс
                    else {
                        $('.toContacts').click();
                        $('body').on('click', '.contactWrapper',  function () {
                            $('.contactsPage').hide();
                            var user =  $(this).data('id');
                            var thisUser = window.localStorage.setItem(user , user);
                            $('.chatPage').show();
                            $('.sendMessage').on('click', function () {
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
                                        getContactsPage(data);
                                    }
                                });
                            });
                        });
                    }
                }
            });
    // } else
    //     {
    //         alert('Введите логин/пароль');
    //     }
    });

//2)
    $('.modalSmsSubmit').on('click' , function () {
        var session = window.localStorage.getItem('session');
        var smsCode = $('#modalSmsBox').val();
        $.ajax({
            method: 'GET',
            url: 'http://msg.9ek.ru/sms/vk',
            data: {
                sms_code: smsCode,
                session: session
                // platform:  device.platform,
                // uuid: uuid,
                // version: version
            },
            beforeSend: function () {
            },
            error: function (data) {
            },
            complete: function () {
                $('.toContacts').click();
                $('.submitData').prop( "disabled", true );
            },
            success: function (data) {
                if (data.status === 'captcha_checker') {
                    var captcha_img =  data['image_base64_captcha'];
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
                                $('.modalCaptchaSubmit').prop( "disabled", true );
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
                                    getContactsPage(data);
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
                            getContactsPage(data);
                        }
                    });
                }
            }
        });
    });

//чат
//      $('.textMessage').on('input', function () {
// передать статус typing
     // });
     // $('.sendMessage').on('click', function () {
     //     var textMessage = $('.textMessage');
     //     if (textMessage.val() !== '') {
     //         $.ajax({
     //             method: this.method,
     //             url: this.action,
     //             data: {
     //                 textMessage: textMessage.val()
     //             },
     //             beforeSend: function () {
     //             },
     //             error: function (data) {
     //             },
     //             complete: function () {
     //             },
     //             success: function (data) {
     //                 data = {'status': 'success'};
     //                 textMessage.val('');
     //             }
     //         });
     //     }
     // });
    // $(function() {
    //     var storiesInterval = 10 * 100;
    //     var fetchNews = function() {
    //         console.log('Sending AJAX request...');
    //         $.ajax({
    //             method: this.method,
    //             url: this.action,
    //             data: { }
    //         }).done(function(msg) {
    //             $(msg).appendTo("#edix");
    //             console.log('success');
    //         }).fail(function() {
    //             console.log('error');
    //         }).always(function() {
    //             // Schedule the next request after this one completes,
    //             // even after error
    //             console.log('Waiting ' + (storiesInterval / 1000) + ' seconds');
    //             setTimeout(fetchNews, storiesInterval);
    //         });
    //     };
    //
    //     // Fetch news immediately, then every 10 seconds AFTER previous request finishes
    //     fetchNews();
    // });
    // $(function () {
    //     $.ajax({
    //         method: this.method,
    //         url: this.url,
    //         data: {
    //         },
    //         beforeSend: function () {
    //         },
    //         error: function (data) {
    //         },
    //         complete: function () {
    //         },
    //         success: function (data) {
    //             d();
    //             data = {'status': 'success'};
    //             var object =  JSON.stringify({
    //
    //             getContactsPage(object);
    //         }
    //     });
    // });

    $('body').on('click', '.contactWrapper',  function () {
        $('.contactsPage').hide();
        var user =  $(this).data('id');
        var thisUser = window.localStorage.setItem(user , user);
       d(thisUser);
        $('.chatPage').show();
        $('.sendMessage').on('click', function () {
            var id = window.localStorage.getItem(user),
                message = $('.textMessage').val(),
                token_vk = window.localStorage.getItem('token_vk');
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
                    // $('.contactsPage').hide();
                    // $('.chatPage').show();
                },
                success: function (data) {
                    d(data);
                }
            });
        });
    });


});





//0. залогиниться.
//если все ок, то переходим на страницу контактов после успешного ввода данных,
//если уже залогинен, то можно по кнопке на странице контактов вернуться на экран логина.
//
//1. выбрать из списка контактов нужный контакт.
//2. при нажати на него, открывается другое окно, типа где писать "chatPage"
//3. кнопка назад к выбору контактов слева сверху.
//4. информация о контакте справа сверху
//5. посередине визуальныое отображение сообщений. "READONLY"
//если сообщение получено то отображать слева, если отослано собой, то справа
//сообщения снизу вверх уходят.


