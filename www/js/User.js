function User(id, authorization)
{
    this.user_id_vk = id;
    this.key_vk = window.localStorage.getItem('key');
    this.server_vk = window.localStorage.getItem('server');
    this.ts_vk = window.localStorage.getItem('ts');

    this.getFriendList = function () {
        $.ajax({
            method: 'GET',
            url: 'http://msg.9ek.ru/friendList/vk',
            data: {
                token_vk: authorization.getToken()
            },
            beforeSend: function () {
            },
            error: function (data) {
            },
            complete: function () {
            },
            success: function (data) {
                $.each(data.response.items, function (index, value)
                {
                    var contactPicture = '<div class="contactPicture" style="background-image:url(' + value.photo_200_orig + ')"></div>';
                    var contactInfo =
                        '<div class="contactInfo">'
                        + '<div class="contactName">'
                        + value.first_name
                        + '</div>'
                        + '<div class="contactLastSeen">'
                        + value.last_name
                        + '</div>'
                        + '<div class="contactId" data-id="'
                        + value.id
                        + '">'
                        + '</div>'
                        + '</div>';

                    $('.contact').append('<div class="contactWrapper" data-id="' + value.id + '">' + contactPicture + contactInfo + '</div>');
                });
            }
        });
    };
    this.getLongPollServerForMessages = function ()
    {
        $.ajax({
        method: 'GET',
        url: 'https://api.vk.com/method/messages.getLongPollServer',
        data: {
            access_token: this.token_vk
        },
        beforeSend: function () {
        },
        error: function (data) {
        },
        complete: function () {
        },
        success: function (data) {
            window.localStorage.setItem('key', data.response.key);
            window.localStorage.setItem('server', data.response.server);
            window.localStorage.setItem('ts', data.response.ts);
        }
        });
    };
    this.serverForLongPoll  = function () {
        $.ajax({
            method: "GET",
            url: 'http://' +  this.server_vk,
            data: {
                act: 'a_check',
                ts: this.ts_vk,
                key: this.key_vk,
                wait: 5,
                mode: 2,
                version: 2
            },
            beforeSend: function () {
            },
            error: function (data) {
            },
            complete: function () {
            },
            success: function (data) {
                var res = JSON.parse(data);
                // sendToServer();
                window.localStorage.setItem('ts', res.ts);
                // getFour(res);
            }
        });
    };


    this.getHistory = function ()
    {
        $.ajax({
            method: 'GET',
            url: 'https://api.vk.com/method/messages.getHistory',
            data: {
                user_id: this.user_id_vk,
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
    };
    this.getDialogs = function ()
    {
        $.ajax({
            method: 'GET',
            url: 'https://api.vk.com/method/messages.getDialogs',
            data: {
                count: 99,
                version: '5.69',
                access_token: this.token_vk
            },
            beforeSend: function () {
            },
            error: function (data) {
            },
            complete: function () {
            },
            success: function (data) {
                for (var i = 1; i < 10; i++) {
                    var body = data.response[i].body,
                        dateUnix = data.response[i].date,
                        mid = data.response[i].mid,
                        out = data.response[i].out, // 1 исходящее / 0 входящее
                        read_state = data.response[i].read_state, // 1 прочитано / 0 непрочитано
                        title = data.response[i].title, //
                        uid = data.response[i].uid; // id пользователя

                    // d(body);
                    // d(date);
                    // d(mid);
                    // d(out);
                    // d(read_state);
                    // d(title);
                    // d(uid);

                    var date = new Date(dateUnix * 1000);
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var seconds = date.getSeconds();
                    var year = date.getFullYear();
                    var month = date.getMonth();
                    var day = date.getDay();
                    d(date);
                    d(hours);
                    d(minutes);
                    d(seconds);
                    d(year);
                    d(month);
                    d(day);
                }
            }
        });
    };
}