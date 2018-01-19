function getMessageHistory(id, token_vk) {
    let ajaxGetMessageHistory = new Ajax('https://api.vk.com/method/messages.getHistory');
    d(id);
    ajaxGetMessageHistory.setData({
        user_id: id,
        access_token: token_vk
    });
    ajaxGetMessageHistory.handler(function (data) {
        d(data);
        for (let i = 1; i < data.response.length; i++) {
            let msg = data.response[i].body;
            $('.messagesChat').prepend('<div >' + msg + '</div>');
        }
    });
}