function appendNewMessages(msg) {
    $('.messagesChat').append('<div >' + msg + '</div>');
}
function userTyping(user_id) {

    let userObject = $('[data-id-user=' + user_id + ']');
    let userInfo = new UserInfo();
    userInfo.take(user_id);

    document.addEventListener(userInfo.ajaxUserInfo.event.type, function (e) {
        let userName = e.detail.response.response[0]['first_name'];
        userObject.find('.userTyping').text(userName).show();
    }, false);
}