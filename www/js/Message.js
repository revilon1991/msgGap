class Message {
    constructor() {
        this.ajaxSendMessage = new Ajax('http://msg.9ek.ru/send/vk');
        this.ajaxSendMessage.setData({
            access_token: window.localStorage.getItem('token_vk')
        });

        this.hideTypingBlockTimeOut = null;
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

    userTyping(user_id) {
        let userObject = $('[data-id-user=' + user_id + ']');
        let userInfo = new UserInfo();
        userInfo.take(user_id);


        document.addEventListener(userInfo.ajaxUserInfo.event.type, function (e) {
            let userName = e.detail.response.response[0]['first_name'];
            userObject.find('.userTyping').text(userName + ' пишет...').fadeIn('slow');
        }, false);
    }

    static appendNewMessages(msg) {
        $('.messagesChat').append('<div >' + msg + '</div>');
    }
}
