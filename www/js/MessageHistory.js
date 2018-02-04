class MessageHistory {
    constructor(token_vk) {
        this.ajaxMessageHistory = new Ajax('https://api.vk.com/method/messages.getHistory');
        this.ajaxMessageHistory.setData({
            access_token: token_vk
        });
    }

    build(user_id) {
        this.ajaxMessageHistory.addData({
            user_id: user_id
        });

        this.ajaxMessageHistory.handler(function (data) {
            new ErrorHandler(data).read();
            for (let i = 1; i < data.response.length; i++) {
                let out = data.response[i]['out'];
                let formatMessage;
                out === 0 ?  formatMessage = 'receivedMessage' : formatMessage = 'sentMessage';
                let msg = data.response[i].body;
                let messagesChat = $('.messagesChat');

                messagesChat.prepend('<div class="' + formatMessage + '">' + msg + '</div>');
                let height = messagesChat[0].scrollHeight;
                messagesChat.scrollTop(height);
            }
        });
    }
}
