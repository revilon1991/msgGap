function getFriendList(token_vk) {
    // 9d385300c31b0f21a5597ede2e78343585e62f0bc1cec525ff48df9f428382616164c2dde82637a07eb2d
    let ajaxGetFriendList = new Ajax('friendList/vk');

    ajaxGetFriendList.setData({
        token_vk: token_vk
    });
    ajaxGetFriendList.handler(function (data) {
        for (let user of data.response.items) {
            // console.log(user);
            // user.first_name;
            // user.id;
            // user.last_name;
            // user.nickname;
            // user.domain;
            // user.last_seen;
            // user.photo_200_orig;
            // user.sex;
            let wrapper = '<div class="contactWrapper"  data-id="' + user.id +  '">' +
                '<div class="user-photo_wrapper"><img class="user-photo" src="'+ user.photo_200_orig + '" alt="'+ user.first_name + '"></div>' +
                '<div class="user-info">' +
                '<div class="user-first_name">' + user.first_name + '</div>' +
                '</div>' +
                '</div>';
            $('.contact').append(wrapper);

        }
    });

}