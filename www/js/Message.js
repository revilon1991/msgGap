class Message {
    constructor() {
        this.ajaxSendMessage = new Ajax('https://api.vk.com/method/messages.send');
        this.ajaxSendMessage.setData({
            access_token: window.localStorage.getItem('token_vk'),
            version: '5.69',
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
            $('.textMessage').val('');

        });
    }

    userTyping(user_id) {
        let userObject = $('[data-id-user=' + user_id + ']');
        let userInfo = new UserInfo();
        userInfo.take(user_id);


        document.addEventListener(userInfo.ajaxUserInfo.event.type, function (e) {
            let userName = e.detail.response.response[0]['first_name'];
            userObject.find('.userTyping').text(userName + ' пишет...').fadeIn('slow');
        }, false);
    }

    static appendNewMessages(msg,index) {
        let formatMessage;
        if (index === 35) {
            formatMessage = 'sentMessage';
        } else if (index === 49) {
            formatMessage = 'receivedMessage';
        }
        let messagesChat = $('.messagesChat');
        messagesChat.append('<div class="'+ formatMessage +'">' + msg + '</div>');
        let height = messagesChat[0].scrollHeight;
        messagesChat.scrollTop(height);
    }

    markAsReadOutMessages() {

    }
}
