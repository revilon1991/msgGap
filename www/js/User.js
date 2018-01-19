// function User(token_vk){
//
// // this.user_id_vk = id;
// // this.token_vk = token_vk;
// this.key_vk = window.localStorage.getItem('key');
// this.server_vk = window.localStorage.getItem('server');
// this.ts_vk = window.localStorage.getItem('ts');
// this.getFriendList = function () {
//
// };

//
//     // this.getDialogs = function () {
//     //     $.ajax({
//     //         method: 'GET',
//     //         url: 'https://api.vk.com/method/messages.getDialogs',
//     //         data: {
//     //             count: 99,
//     //             version: '5.69',
//     //             access_token: this.token_vk
//     //         },
//     //         beforeSend: function () {
//     //         },
//     //         error: function (data) {
//     //         },
//     //         complete: function () {
//     //         },
//     //         success: function (data) {
//     //             for (var i = 1; i < 10; i++) {
//     //                 var body = data.response[i].body,
//     //                     dateUnix = data.response[i].date,
//     //                     mid = data.response[i].mid,
//     //                     out = data.response[i].out, // 1 исходящее / 0 входящее
//     //                     read_state = data.response[i].read_state, // 1 прочитано / 0 непрочитано
//     //                     title = data.response[i].title, //
//     //                     uid = data.response[i].uid; // id пользователя
//     //
//     //                 // d(body);
//     //                 // d(date);
//     //                 // d(mid);
//     //                 // d(out);
//     //                 // d(read_state);
//     //                 // d(title);
//     //                 // d(uid);
//     //
//     //                 var date = new Date(dateUnix * 1000);
//     //                 var hours = date.getHours();
//     //                 var minutes = date.getMinutes();
//     //                 var seconds = date.getSeconds();
//     //                 var year = date.getFullYear();
//     //                 var month = date.getMonth();
//     //                 var day = date.getDay();
//     //                 d(date);
//     //                 d(hours);
//     //                 d(minutes);
//     //                 d(seconds);
//     //                 d(year);
//     //                 d(month);
//     //                 d(day);
//     //             }
//     //         }
//     //     });
//     // };
// }