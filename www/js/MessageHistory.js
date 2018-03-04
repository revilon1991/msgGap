class MessageHistory {
    constructor(token_vk) {
        this.ajaxMessageHistory = new Ajax('https://api.vk.com/method/messages.getHistory');
        this.ajaxMessageHistory.setData({
            access_token: token_vk,
            version: '5.69'
        });
    }

    build(user_id) {
        this.ajaxMessageHistory.addData({
            user_id: user_id
        });

        this.ajaxMessageHistory.setPreLoader(function () {
            $.mobile.loading('show', {
                text: 'Загрузка...',
                textVisible: true,
                theme: 'b',
                html: '<div class="custom-loader"><i class="fa fa-spinner fa-spin"></i></div><h1>Загрузка...</h1>'
            });
        });

        this.ajaxMessageHistory.setPostLoader(function () {
            $.mobile.loading('hide');
        });

        this.ajaxMessageHistory.handler(function (data) {
            new ErrorHandler(data).read();

            let blockChat = $('#page_vk_chat');
            blockChat.find('.chat')[0].dataset.chat_id = user_id;

            for (let i = 1; i < data.response.length; i++) {
                let out = data.response[i]['out'];
                let formatMessage;
                out === 0 ?  formatMessage = 'receivedMessage' : formatMessage = 'sentMessage';
                let msg = data.response[i].body;
                blockChat.find('.chat').prepend('<div class="message ' + formatMessage + '">' + msg + '</div>');
            }
        });
    }
}
