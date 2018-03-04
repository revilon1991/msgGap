function d(arg) {
    console.log(arg);
}

$ = jQuery;

// let staticToken = 'e82a9109150f70295d08aa668bfe794b4e8f36d18b57e7311064a5646b150c231beec3c76404f41e9f33a';
// window.localStorage.setItem('token_vk', 'noToken');
// window.localStorage.setItem('token_vk', staticToken);

function rebuildFooter(options) {
    let footerStatic = $('.footer-static'),
        vk = footerStatic.find('.button__vk'),
        tg = footerStatic.find('.button__tg')
    ;

    switch (options.hide) {
        case true:
            footerStatic.hide();
            break;
        case false:
            footerStatic.show();
            break;
    }

    if (options['vk']) {
        vk.attr('href', options['vk']['href']);
        if (options['vk']['active']) {
            vk.addClass('ui-btn-active').addClass('ui-state-persist');
        } else {
            vk.removeClass('ui-btn-active').removeClass('ui-state-persist');
        }
    }

    if (options['tg']) {
        tg.attr('href', options['tg']['href']);
        if (options['tg']['active']) {
            tg.addClass('ui-btn-active').addClass('ui-state-persist');
        } else {
            tg.removeClass('ui-btn-active').removeClass('ui-state-persist');
        }
    }

}

let application = {
    initialize: function () {
        this.uuid = window.device.uuid ? window.device.uuid : 'lol-kek-hah'; // TODO remove temp uuid
        this.authorization = new Authorization();
        
        $(document).on('touchstart', '.button', function() {
            $(this).addClass('touch-element');
        });
        $(document).on('touchend', '.button', function() {
            $(this).removeClass('touch-element');
        });

        document.addEventListener('deviceready', function () {
            let token_vk = window.localStorage.getItem('token_vk');
            Authorization.getToken(application.uuid).handler(function (data) {
                if (data.token) {
                    window.localStorage.setItem('token_vk', data.token);
                    new Dialog('#page_vk_dialogs .dialog-list').handle(function () {
                        $('body').pagecontainer('change', '#page_vk_dialogs');
                        rebuildFooter({
                            vk: {href: '#page_vk_dialogs', active: true},
                        });
                    });
                } else {
                    $('body').pagecontainer('change', '#page_vk_login');
                    rebuildFooter({
                        vk: {href: '#page_vk_login', active: true},
                    });
                }
            });

            document.addEventListener('resume', function () {
                let token_vk = window.localStorage.getItem('token_vk');
                Authorization.checkToken(token_vk).handler(function (data) {
                    if (data.status === 'error') {
                        $('body').pagecontainer('change', '#page_vk_login');
                        rebuildFooter({
                            vk: {href: '#page_vk_login', active: true},
                        });
                    }
                });
            });
        }, false);

        $('body').pagecontainer({
            show: function(event, ui) {
                switch (ui.toPage.prop('id')) {
                    case 'page_vk_chat':
                        ChatVk.enterChatScrollBottomAction();
                        break;
                }
            }
        });

        $('body').on('pagecontainerload', function(event, ui) {
            switch (ui.toPage.prop('id')) {
                case 'page_vk_dialogs':
                    $(function () {
                        $('body').pagecontainer('change', '#page_vk_dialogs');
                    });
                    break;
            }
        });
        
        let longPull = new LongPull();
        longPull.init();
    }
};

// Ввод логин пароля
$(document).on('submit', '#page_vk_login .form__login', function (e) {
    e.preventDefault();
    LoginVk.loginSubmitAction(application.authorization);
    try {
        application.authorization.processLogin(
            $(this).closest('.form').find('.field__login input[type="text"]').val(),
            $(this).closest('.form').find('.field__password input[type="password"]').val(),
            application.uuid
        );
    } catch (e) {
        alert(e);
    }
    // application.authorization.processLogin('revil-on@mail.ru', 'utihot62', application.uuid);
});

// Ввод смс
$(document).on('submit', '#page_vk_login_sms .form__sms', function (e) {
    e.preventDefault();
    LoginVk.smsSubmitAction(application.authorization);
    let smsCode = $(this).closest('.form').find('input[type=text]').val();
    application.authorization.processSms(smsCode, application.uuid);
});

// Ввод каптчи
$(document).on('submit', '#page_vk_login_captcha .form__captcha', function (e) {
    e.preventDefault();
    LoginVk.captchaSubmitAction(application.authorization);
    let captchaCode = $(this).closest('.form').find('input[type=text]').val();
    application.authorization.processCaptcha(captchaCode, application.uuid);
});

// Открытие чата
$(document).on('click', '#page_vk_dialogs .sendWrapper', function () {
    let messageHistory = new MessageHistory(window.localStorage.getItem('token_vk')),
        pageVkChat = $('#page_vk_chat'),
        selectedUsername = $(this).find('.userName').text()
    ;

    pageVkChat.find('form.send-message').data('id-user', $(this).data('id-user'));
    pageVkChat.find('.chat').html('');
    pageVkChat.find('.header__text').text(selectedUsername);
    messageHistory.build(
        $(this).data('id-user')
    );
    $('body').pagecontainer('change', '#page_vk_chat');
});

// Отправка сообщения
$(document).on('click', '#page_vk_chat form.send-message .submit', function () {
    let id_dialog = $(this).closest('form').data('id-user');
    let messageField = $(this).closest('form').find('.field__text');
    let message = new Message(window.localStorage.getItem('token_vk'));
    message.send(id_dialog, messageField.val());
    messageField.val('');
});

// Пользователь приложения набирает текст в чате
$(document).on('input', '#page_vk_chat form.send-message .field__text', function () {
    let typing = new Ajax('https://api.vk.com/method/messages.setActivity');
    typing.setData({
        access_token: window.localStorage.getItem('token_vk'),
        type: 'typing',
        user_id: $(this).closest('[data-role=page]').find('.chat')[0].dataset.chat_id,
        version: '5.69'
    });
    typing.handler();
});

// Пользователь приложения прочитал входящие сообщения
$(document).on('touchstart', '#page_vk_chat', function() {
    if ($(this).find('.chat .receivedMessage.unread').length === 0) {
        return;
    }

    let typing = new Ajax('https://api.vk.com/method/messages.markAsRead');
    typing.setData({
        access_token: window.localStorage.getItem('token_vk'),
        peer_id: $(this).find('.chat')[0].dataset.chat_id,
        version: '5.69'
    });
    typing.handler();
});

// let login = $('#vk_login').val();
// let password = $('#vk_password').val();
// let uuid = window.localStorage.getItem('uuid');
// authorization.processLogin(login, password, uuid);


// $('.toContacts').on('click', function () {
//     $('.window').hide();
//     $('.contactsPage').show();
//     $('.toContacts').hide();
//     // $('.toAuthorize').show();
//     $('.toDialogs').show();
//     $('.chatPage').hide();
//     // $('.textWrapper').hide();
//
// });
// // $('.toAuthorize').on('click', function () {
// //     $('.window').hide();
// //     $('.loginPage').show();
// //     $('.toAuthorize').hide();
// //     $('.toContacts').show();
// //     $('.toDialogs').show();
// //     $('.chatPage').hide();
// //     $('.dialogList').show();
// //     $('.textWrapper').show();
// // });
//
// $('.toDialogs').on('click', function () {
//     $('.window').hide();
//     $('.dialogsPage').show();
//     $('.toDialogs').hide();
//     $('.toContacts').show();
//     // $('.toAuthorize').show();
//     $('.chatPage').hide();
//     $('.dialogList').show();
//     // $('.textWrapper').show();
//
// });
// // 1)
// let dialog = new Dialog('.dialogList');
// let friendList = new FriendList('.contact');
// let ajaxCheckToken = authorization.checkToken();
//
// let getToken = new GetToken('lol-kek-hah');
// getToken.getToken();
//
//
//
//
//
//
//
//
// // Long Pull
// let longPull = new LongPull();
// longPull.init();
//
// // // Получение информации о пользователе
// // let userInfo = new UserInfo(staticToken);
// // userInfo.take('12143704');
//
// // Проверка токена при возобновлении работы приложения
// document.addEventListener('resume', function () {
//     ajaxCheckToken.handler(function (data) {
//         switch (data.status) {
//             case 'success':
//                 d('Токен в порядке');
//                 dialog.handle();
//                 friendList.handle();
//                 $('.window').hide();
//                 $('.dialogsPage').show();
//                 $('.toContacts').show();
//                 $('.toDialogs').show();
//                 break;
//             case 'error':
//                 d('Токен протух');
//                 $('.window').hide();
//                 $('.toContacts').hide();
//                 $('.toDialogs').hide();
//                 $('.loginPage').show();
//                 break;
//         }
//     });
// });
//
// // Диалоги
// document.addEventListener("deviceready", function () {
//     // ajaxCheckToken.handler(function (data) {
//     //     switch (data.status) {
//     //         case 'success':
//     //             d('Токен в порядке');
//     //             dialog.handle();
//     //             friendList.handle();
//     //             $('.window').hide();
//     //             $('.dialogsPage').show();
//     //             $('.toContacts').show();
//     //             $('.toDialogs').show();
//     //             break;
//     //         case 'error':
//     //             d('Токен протух');
//     //             $('.window').hide();
//     //             $('.toContacts').hide();
//     //             $('.toDialogs').hide();
//     //             $('.loginPage').show();
//     //             break;
//     //     }
//     // });
//
//     let device = window.device,
//         element = document.getElementById('deviceProperties');
//     element.innerHTML =
//         'Device Model: '    + device.model    + '<br />' +
//         'Device Cordova: '  + device.cordova  + '<br />' +
//         'Device Platform: ' + device.platform + '<br />' +
//         'Device UUID: '     + device.uuid     + '<br />' +
//         'Device Version: '  + device.version  + '<br />';
//     window.localStorage.setItem('uuid', device.uuid);
// }, false);
//
// $('.submitData').on('click', function () {
//     let wrapperSubmitData = $(this).closest('.wrapper-submitData');
//     wrapperSubmitData.find('.button-loader').show();
//     wrapperSubmitData.find('.submitData').hide();
//     authorization.setCallback(function () {
//         wrapperSubmitData.find('.button-loader').hide();
//         wrapperSubmitData.find('.submitData').show();
//     });
//     // let login = $('#vk_login').val();
//     // let password = $('#vk_password').val();
//     // let uuid = window.localStorage.getItem('uuid');
//     authorization.processLogin('revil-on@mail.ru', 'utihot62', 'lol-kek-hah');
//     // authorization.processLogin(login, password, uuid);
// });
//
// $('.modalSmsSubmit').on('click', function () {
//     let smsCode = $('#modalSmsBox').val();
//     // let uuid = window.localStorage.getItem('uuid');
//     authorization.processSms(smsCode);
//     // authorization.processSms(smsCode, uuid);
// });
//
// $('.modalCaptchaSubmit').on('click', function () {
//     let captchaCode = $('#modalCaptchaBox').val();
//     // let uuid = window.localStorage.getItem('uuid');
//     authorization.processCaptcha(captchaCode);
//     // authorization.processCaptcha(captchaCode, uuid);
// });
//
//
// // Получение истории сообщений
// $('.window').on('click', '.sendWrapper', function () {
//     $('.toDialogs').show();
//     $('.toContacts').show();
//
//     $('.messagesChat').html('');
//     let clone = $(this).clone();
//     $('.nameChat').html(clone);
//     let user = $(this).data('id-user');
//     window.localStorage.setItem(user, user);
//     let token_vk = window.localStorage.getItem('token_vk');
//
//     let collectionHide = $()
//         .add('.dialogList')
//         .add('.contactsPage')
//         .add('.dialogPage')
//         .add('.textWrapper')
//     ;
//     let collectionShow = $()
//         .add('.chatPage')
//     ;
//     collectionHide.hide();
//     collectionShow.show();
//
//     let messageHistory = new MessageHistory(staticToken);
//     // let messageHistory = new MessageHistory(token_vk);
//     messageHistory.build(window.localStorage.getItem(user));
// });
// // Отправка сообщения в чат
// $('.sendMessage').on('click', function () {
//     let id_dialog = $(this).closest('.chatPage').find('.sendWrapper').data('id-user');
//     // let token_vk = window.localStorage.getItem('token_vk'),
//     let messageText = $('.textMessage').val();
//     // let message = new Message();
//     let message = new Message(staticToken);
//     message.send(id_dialog, messageText);
// });


// var ref = cordova.InAppBrowser.open('https://twitter.github.io/typeahead.js/examples/', '_blank', 'location=yes');
// ref.addEventListener('loadstart', function(event) { alert(event.url); });