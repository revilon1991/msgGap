class ChatVk {
    static enterChatScrollBottomAction() {
        $('html, body').animate({
            scrollTop: $(document).height() - $(window).height()
        });
    }

    static appendNewMessages(message, messageId, type) {
        $('#page_vk_chat').find('.chat').append(sprintf(
            '<div class="message message-%s unread %s">%s</div>',
            messageId,
            type,
            message
        ));
    }

    static removeFlagUnread(type) {
        let blockPage = $('#page_vk_chat');

        switch (type) {
            case 'sentMessage':
                blockPage.find('.chat .sentMessage.message').removeClass('unread');
                break;
            case 'receivedMessage':
                blockPage.find('.chat .receivedMessage.message').removeClass('unread');
                break;
        }
    }

    static setUserStatus(status) {
        let chatPage = $('#page_vk_chat');
        switch (status) {
            case 'online':
                chatPage.find('.status .online').fadeIn();
                break;
            case 'offline':
                chatPage.find('.status .online').fadeOut();
                break;
            case 'start-typing':
                chatPage.find('.status .online').fadeOut(400, function () {
                    chatPage.find('.status .typing').fadeIn().css('display', 'inline-block');
                });
                break;
            case 'end-typing':
                chatPage.find('.status .typing').hide();
                chatPage.find('.status .online').fadeIn();
                break;
        }
    }
}