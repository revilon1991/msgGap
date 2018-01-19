function getLongPollServerForMessages(token_vk) {
    let ajaxGetLongPollServerForMessages = new Ajax('https://api.vk.com/method/messages.getLongPollServer');

    ajaxGetLongPollServerForMessages.setData({
        access_token: token_vk
    });
    ajaxGetLongPollServerForMessages.handler(function (data) {
        // d(data);
        // window.localStorage.setItem('key', data.response.key);
        // window.localStorage.setItem('server', data.response.server);
        // window.localStorage.setItem('ts', data.response.ts);
        let server = data.response.server;
        let ts = data.response.ts;
        let key = data.response.key;
        setInterval( function(){
            getServerForLongPoll(server, ts, key, token_vk)
        }, 10000 );


    });
}

function getServerForLongPoll(server, ts_vk, key_vk, token_vk) {

    let ajaxGetServerForLongPoll = new Ajax('http://' + server);
    ajaxGetServerForLongPoll.setData({
        act: 'a_check',
        ts: ts_vk,
        key: key_vk,
        wait: 5,
        mode: 2,
        version: 2
    });
    ajaxGetServerForLongPoll.handler(function (data) {
        let res = JSON.parse(data);
            // sendToServer();
        // d(res.updates);
        // getFour(res);
            // window.localStorage.setItem('ts', res.ts);
        for (let i = 1; i < res.updates.length; i++) {
            d(res.updates[i]);

            if (res.updates[i][0] === 4 ) {
                getMessageHistory(res.updates[i][0][3], token_vk)
            }
            // let msg = data.response[i].body;
        }

    });
}


