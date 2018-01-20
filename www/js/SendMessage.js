class SendMessage {
    constructor(token_vk) {
        this.ajaxSendMessage = new Ajax('http://msg.9ek.ru/send/vk');
        this.ajaxSendMessage.setData({
            token_vk: token_vk
        });
    }

    send(id, message) {
        this.ajaxSendMessage.addData({
            user_to: id,
            message: message
        });

        this.ajaxSendMessage.handler(function (data) {
            new ErrorHandler(data).read();

            $('.messagesChat').append('<div>' + data.message + '</div>');
            $('.textMessage').val('');
        });
    }
}
