function Authorization(login, password) {
    this.token = false;

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        var element = document.getElementById('deviceProperties');
        element.innerHTML =
            'Device Platform: ' + device.platform + '<br />' +
            'Device UUID: ' + device.uuid + '<br />' +
            'Device Version: ' + device.version + '<br />';
    }

    this.login_vk = login;
    this.password_vk = login;
    // this.uuid_vk = device.uuid;

    this.getToken = function () {
        return this.token;
    };

    this.buildToken = function () {
        var result = false,
            token_vk = '',
            status_checker = '';
        $.ajax({
            method: 'GET',
            url: 'http://msg.9ek.ru/login/vk',
            data: {
                // login: 'skaji.net1@mail.ru',
                // login: this.login_vk,
                login: 'revil-on@mail.ru',
                // password: 'Gxgooccmg2',
                // password: this.password_vk,
                password: 'utihot62',
                // platform:  device.platform,
                uuid: '0046438'
                // uuid_vk: 'device.uuid'
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
                // d(data);
                // проверка смс
                window.localStorage.setItem('session', data['session']);
                window.localStorage.setItem('token_vk', data['token_vk']);
                status_checker = data['status'];
                token_vk = window.localStorage.getItem('token_vk');
                if (status_checker === 'sms_checker') {
                    $('.modalSms').show();
                    // modalSmsSubmit();
                    result = true;
                }
                // если без смс
                else if (status_checker === 'success') {
                    window.localStorage.setItem('token_vk', data['token_vk']);
                    token_vk = window.localStorage.getItem('token_vk');
                    $('.toContacts').click();
                    // user.getFriendList();
                    // user.getLongPollServerForMessages();
                    this.token = token_vk;
                }
            }
        });
        return result;
    };
}