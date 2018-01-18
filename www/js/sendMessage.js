function sendMessage(message, id, token_vk) {
    let ajaxSendMessage = new Ajax('http://msg.9ek.ru/send/vk');

    ajaxSendMessage.setData({
        user_to: id,
        message: message,
        token_vk: token_vk
    });
    ajaxSendMessage.handler(function (data) {
        d(data);
        $('.messagesChat').append('<div>' + data.message + '</div>');
        $('.textMessage').val('');
    });









    //
    // $.ajax({
    //     method: 'GET',
    //     url: 'http://msg.9ek.ru/send/vk',
    //     data: {
    //         user_to: id,
    //         message: message,
    //         token_vk: token_vk
    //     },
    //     beforeSend: function () {
    //     },
    //     error: function (data) {
    //     },
    //     complete: function () {
    //     },
    //     success: function (data) {
    //         $('.messagesChat').prepend('<div>' + data.message + '</div>');
    //         $('.textMessage').val('');
    //     }
    // });
}