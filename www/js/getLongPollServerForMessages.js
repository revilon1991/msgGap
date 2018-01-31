function getLongPoll(token_vk) {
    let ajaxGetLongPollServerForMessages = new Ajax('https://api.vk.com/method/messages.getLongPollServer');

    ajaxGetLongPollServerForMessages.setData({
        access_token: token_vk
    });
    ajaxGetLongPollServerForMessages.handler(function (data) {
        window.localStorage.setItem('key', data.response.key);
        window.localStorage.setItem('server', data.response.server);
        window.localStorage.setItem('ts', data.response.ts);
        let ts =  window.localStorage.getItem('ts');
        getNewLogPoll(ts);
    });
}

function getNewLogPoll(ts) {
    let key =  window.localStorage.getItem('key');
    let server =  window.localStorage.getItem('server');
    let token_vk =  window.localStorage.getItem('token_vk');
    let ajaxGetServerForLongPoll = new Ajax('http://' + server);
    ajaxGetServerForLongPoll.setData({
        act: 'a_check',
        ts: ts,
        key: key,
        wait: 25,
        mode: 2,
        version: 2
    });
    ajaxGetServerForLongPoll.handler(function (data) {
        // d(data);

        let res = JSON.parse(data);
        // d(res.updates);
        if (data.failed) {
            // getLongPoll(token_vk);
            getLongPoll('1f21b4d8acd12764535509e8fe6b1edb3efc9d4d2d95260ff6622b98219abe534456b5509dd27b2ed2904');
        }
        for (let i = 0; i < res.updates.length; i++) {
            switch (res.updates[i][0]) {
                case 4:
                    let msg = res.updates[i][5];
                    appendNewMessages(msg);
                    break;
                case 8:
                   //юзер стал онлайн
                    break;
                case 9:
                    //юзер стал оффлайн
                    break;
                case 61:
                    let user_id = res.updates[i][1];
                    let userObject = $('[data-id-user=' + user_id + ']');
                    let hideTypingBlockTimeOut = setTimeout(function () {
                        userObject.find('.userTyping').hide();
                    },5000);
                    userTyping(user_id);
                    break;
            }
        }

        getNewLogPoll(res.ts);
    });

}


