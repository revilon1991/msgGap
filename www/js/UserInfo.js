class UserInfo {
    constructor() {
        this.ajaxUserInfo = new Ajax('https://api.vk.com/method/users.get', {
            eventName: 'ajaxUserInfo',
            data: {
                version: '5.69',
                access_token: window.localStorage.getItem('token_vk')
            }
        });
    }

    /**
     * @param user_id array|string
     */
    take(user_id) {
        let idList;
        if (Array.isArray(user_id)) {
            idList = user_id.join(',')
        } else {
            idList = user_id;
        }

        this.ajaxUserInfo.addData({
            user_ids: idList,
            /**
             * photo_id, verified, sex, bdate, city, country, home_town, has_photo,
             * photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max,
             * photo_max_orig, online, domain, has_mobile, contacts, site, education,
             * universities, schools, status, last_seen, followers_count, common_count,
             * occupation, nickname, relatives, relation, personal, connections, exports, wall_comments,
             * activities, interests, music, movies, tv, books, games, about, quotes, can_post,
             * can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request,
             * is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend,
             * friend_status, career, military, blacklisted, blacklisted_by_me
             */
            fields: 'city,sex,photo_200_orig,online,status,domain,last_seen',
            /**
             * Падеж:
             * именительный – nom
             * родительный – gen
             * дательный – dat
             * винительный – acc
             * творительный – ins
             * предложный – abl
             */
            name_case: 'nom'
        });

        this.ajaxUserInfo.handler(function (data) {
            new ErrorHandler(data).read();
        });
    }
}
