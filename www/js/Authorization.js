// resume
// function check_token() {
//     document.addEventListener("resume", function () {
//         var token_vk = window.localStorage.getItem('token_vk');
//         $.ajax({
//             method: 'GET',
//             url: 'http://msg.9ek.ru/check_token/vk',
//             data: {
//                 token_vk: token_vk
//             },
//             beforeSend: function () {
//             },
//             error: function (data) {
//             },
//             complete: function () {
//             },
//             success: function (data) {
//                 var res = JSON.stringify(data);
//                 d(res);
//                 alert('Работа возоблена')
//             }
//         });
//     });
// }
// check_token();


// ajax.setData({
//     // login: 'skaji.net1@mail.ru',
//     // login: this.login_vk,
//     login: 'revil-on@mail.ru',
//     password: 'utihot62',
//     // password: 'Gxgooccmg2',
//     // password: this.password_vk,

//     // platform:  device.platform,
//     uuid: '0046438'
//     // uuid_vk: 'device.uuid'
//     // version: version
// });

//         var session = window.localStorage.setItem('session', data['session']);
//         var token = window.localStorage.setItem('token_vk', data['token_vk']);
//         var status_checker = data['status'];
//         if (status_checker === 'sms_checker') {
//             $('.modalSms').show();
//         }
//         else if (status_checker === 'success') {
//             var token_vk = window.localStorage.getItem('token_vk');
//             $('.toContacts').click();
//             getFriendList(token_vk);
//         }



