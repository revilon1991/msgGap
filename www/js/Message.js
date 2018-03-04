class Message {
    constructor(token) {
        this.ajaxSendMessage = new Ajax('https://api.vk.com/method/messages.send');
        this.ajaxSendMessage.setData({
            access_token: token,
            version: '5.69'
        });
        this.hideTypingBlockTimeOut = null;
    }

    send(id, message) {
        this.ajaxSendMessage.addData({
            user_id: id,
            message: message
        });

        this.ajaxSendMessage.handler(function (data) {
            new ErrorHandler(data).read();
        });
    }
}
