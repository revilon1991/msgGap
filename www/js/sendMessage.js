function sendMessage(id, message, token_vk) {
    let ajaxSendMessage = new Ajax('http://msg.9ek.ru/send/vk');

    ajaxSendMessage.setData({
        user_to: id,
        message: message,
        token_vk: token_vk
    });
    ajaxSendMessage.handler(function (data) {
        $('.messagesChat').append('<div>' + data.message + '</div>');
        $('.textMessage').val('');
    });
}