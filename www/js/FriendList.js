class FriendList {
    constructor(token_vk) {
        this.ajaxFriendList = new Ajax('http://msg.9ek.ru/friendList/vk');
        this.ajaxFriendList.setData({
            token_vk: token_vk
        });
    }

    build() {
        this.ajaxFriendList.handler(function (data) {
            new ErrorHandler(data).read();

            for (let user of data.response.items) {
                let wrapper =
                    // <HTML>
                    '<div class="contactWrapper sendWrapper"  data-id-user="' + user.id +  '">' +
                        '<div class="user-photo_wrapper">' +
                            '<img class="user-photo" src="'+ user.photo_200_orig + '" alt="'+ user.first_name + '">' +
                        '</div>' +
                        '<div class="user-info">' +
                            '<div class="user-first_name">' + user.first_name + '</div>' +
                        '</div>' +
                    '</div>';
                    // </HTML>

                $('.contact').append(wrapper);

            }
        });
    }
}
