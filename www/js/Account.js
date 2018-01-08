// function getLongPollServerForMessages(token_vk) {
//     $.ajax({
//         method: 'GET',
//         url: 'https://api.vk.com/method/messages.getLongPollServer',
//         data: {
//             access_token: token_vk
//         },
//         beforeSend: function () {
//         },
//         error: function (data) {
//         },
//         complete: function () {
//         },
//         success: function (data) {
//             window.localStorage.setItem('key', data.response.key);
//             window.localStorage.setItem('server', data.response.server);
//             window.localStorage.setItem('ts', data.response.ts);
//         }
//     });
// }

function Account(id, token_vk) {
    this.token_vk = token_vk;
    this.id = id;
    this.getFriendList = function () {
        $.ajax({
            method: 'GET',
            url: 'http://msg.9ek.ru/friendList/vk',
            data: {
                token_vk: this.token_vk
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
    };
    this.getHistory = function () {
        $.ajax({
            method: 'GET',
            url: 'https://api.vk.com/method/messages.getHistory',
            data: {
                user_id: this.id,
                access_token: this.token_vk
            },
            beforeSend: function () {
            },
            error: function (data) {
            },
            complete: function () {
            },
            success: function (data) {
                //посчитать респонс даты, зсунуть количество в i < это число
                // for (var i = 1; i < 10; i++) {
                //     var msg = data.response[i].body;
                //     $('.messagesChat').prepend('<div>' + msg + '</div>');
                // }
                for (var i = 1; i < 10; i++) {
                    var msg = data.response[i].body;
                    $('.messagesChat').prepend('<div>' + msg + '</div>');
                }
            }
        });
    }
}