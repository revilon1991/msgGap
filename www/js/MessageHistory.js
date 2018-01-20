class MessageHistory {
    constructor(token_vk) {
        this.ajaxMessageHistory = new Ajax('https://api.vk.com/method/messages.getHistory');
        this.ajaxMessageHistory.setData({
            token_vk: token_vk
        });
    }

    build(user_id) {
        this.ajaxMessageHistory.addData({
            user_id: user_id
        });

        this.ajaxMessageHistory.handler(function (data) {
            new ErrorHandler(data).read();

            for (let i = 1; i < data.response.length; i++) {
                let msg = data.response[i].body;
                $('.messagesChat').prepend('<div >' + msg + '</div>');
            }
        });
    }
}
