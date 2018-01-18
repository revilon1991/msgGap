function getMessageHistory(id, token_vk) {
    let ajaxGetMessageHistory = new Ajax('https://api.vk.com/method/messages.getHistory');

    ajaxGetMessageHistory.setData({
        user_id: id,
        access_token: token_vk
    });
    ajaxGetMessageHistory.handler(function (data) {
        d(data);
        for (let i = 1; i < data.response.length; i++) {
            let msg = data.response[i].body;
            $('.messagesChat').prepend('<div>' + msg + '</div>');
        }
    });






    //
    //
    // $.ajax({
    //     method: 'GET',
    //     url: 'https://api.vk.com/method/messages.getHistory',
    //     data: {
    //         user_id: id,
    //         access_token: token_vk
    //     },
    //     beforeSend: function () {
    //     },
    //     error: function (data) {
    //     },
    //     complete: function () {
    //     },
    //     success: function (data) {
    //         d(data.response.length);
    //         // посчитать респонс даты, засунуть количество в i < это число
    //
    //     }
    // });
}