function getLongPoll(token_vk) {
    let ajaxGetLongPollServerForMessages = new Ajax('https://api.vk.com/method/messages.getLongPollServer');

    ajaxGetLongPollServerForMessages.setData({
        access_token: token_vk
    });
    ajaxGetLongPollServerForMessages.handler(function (data) {
        // d(data);
        window.localStorage.setItem('key', data.response.key);
        window.localStorage.setItem('server', data.response.server);
        window.localStorage.setItem('ts', data.response.ts);
        // let server = data.response.server;
        // let ts = data.response.ts;
        // let key = data.response.key;
        // setInterval(function () {
        let ts =  window.localStorage.getItem('ts');
        getNewMessages(ts);
        // }, 10000) ;
    });
}

function getNewMessages(ts) {
    if (!ts) {
         ts =  window.localStorage.getItem('ts');
    }
    let key =  window.localStorage.getItem('key');
    let server =  window.localStorage.getItem('server');
    let token_vk =  window.localStorage.getItem('token_vk');
    let ajaxGetServerForLongPoll = new Ajax('http://' + server);
    ajaxGetServerForLongPoll.setData({
        act: 'a_check',
        ts: ts,
        key: key,
        wait: 5,
        mode: 2,
        version: 2
    });
    ajaxGetServerForLongPoll.handler(function (data) {
        let res = JSON.parse(data);
        d(res.ts);
        if (data.failed) {
            getLongPoll(token_vk);
        }
            // window.localStorage.setItem('ts', res.ts);
        for (let i = 0; i < res.updates.length; i++) {
            if (res.updates[i][0] === 4 ) {
                let msg = res.updates[i][5];
                $('.messagesChat').append('<div >' + msg + '</div>');
                // getMessageHistory(res.updates[i][3], token_vk)
                return;
            }
        }
        d("вторая попытка");
        d(res.ts);
        getNewMessages(res.ts);
    });

}


