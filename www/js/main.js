var request = 'http://msg.9ek.ru/';
jQuery(function ($){
    $('#login-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: this.method,
            url: request,
            data: $(this).serialize(),
            beforeSend: function () {

            },
            success: function (data) {

            },
            error: function (data) {

            },
            complete: function () {

            }
        });
    });
});
jQuery(function ($){
    $('#send-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: this.method,
            url: request + 'send',
            data: $(this).serialize(),
            beforeSend: function () {

            },
            success: function (data) {

            },
            error: function (data) {

            },
            complete: function () {

            }
        });
    });
});
jQuery(function ($){
    $('.check_password').click(function(){
        var input = $(this).closest('.login-page_password').find('input.password');
        if(input.attr("type") === "password"){
            input.attr("type","text");
        }else{
            input.attr("type","password");
        }
    });
    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };
    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    $('.search .typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'states',
            source: substringMatcher(states)
        });
});
jQuery(function ($){
    $('.toContacts').on('click', function () {
        $('.loginPage').hide();
        $('.contactsPage').show();
    });
    $('.toAuthorize').on('click', function () {
        $('.loginPage').show();
        $('.contactsPage').hide();
    });
    $('.toAuthorize').on('click', function () {
        $('.loginPage').show();
        $('.contactsPage').hide();
    });

    $('.vk_submit').find('input[name*="vk_submit"]').on('click', function () {

    });
});
jQuery(function ($){
//экран логина
    $('.submitData').on('click', function() {
        var login = $('input#vk_login').val();
        var password = $('input#vk_password').val();
        if (login !== '' && password !== '') {
            document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                var element = document.getElementById('deviceProperties');
                element.innerHTML =
                    'Device Platform: ' + device.platform + '<br />' +
                    'Device UUID: '     + device.uuid     + '<br />' +
                    'Device Version: '  + device.version  + '<br />';
            }
            $.ajax({
                method: this.method,
                url: this.action,
                data: {
                    login: login,
                    password: password
                    // ,
                    // platform:  device.platform,
                    // uuid: uuid,
                    // version: version
                },
                beforeSend: function () {
                },
                error: function (data) {
                },
                complete: function () {
                    setTimeout(function () {
                        $('.toContacts').click();
                    }, 1000);
                    $('.submitData').prop( "disabled", true );
                },
                success: function (data) {
                    data = {'status': 'success'};
                   var object =  JSON.stringify( {
                       "response": {
                           "count": 84,
                           "items": [
                               {
                                   "id": 12143704,
                                   "first_name": "Евгений",
                                   "last_name": "Kuznetsov",
                                   "sex": 2,
                                   "nickname": "me",
                                   "domain": "me000",
                                   "photo_200_orig": "https://pp.userapi.com/c840138/v840138779/29b1c/-czG1W33ec4.jpg",
                                   "online": 0,
                                   "can_write_private_message": 1,
                                   "last_seen": {
                                       "time": 1514141599,
                                       "platform": 7
                                   }
                               },
                               {
                                   "id": 13620141,
                                   "first_name": "Жанна",
                                   "last_name": "Позднякова",
                                   "sex": 1,
                                   "nickname": "",
                                   "domain": "intorow",
                                   "photo_200_orig": "https://pp.userapi.com/c638430/v638430141/1953f/VZ6xW68whzM.jpg",
                                   "online": 0,
                                   "can_write_private_message": 1,
                                   "last_seen": {
                                       "time": 1514110474,
                                       "platform": 2
                                   }
                               },
                               {
                                   "id": 9560286,
                                   "first_name": "Ярослав",
                                   "last_name": "Грицаенко",
                                   "sex": 2,
                                   "nickname": "",
                                   "domain": "id9560286",
                                   "photo_200_orig": "https://pp.userapi.com/c840131/v840131115/43bb3/HJmOtnTDodo.jpg",
                                   "online": 0,
                                   "can_write_private_message": 1,
                                   "last_seen": {
                                       "time": 1514108647,
                                       "platform": 7
                                   }
                               },
                               {
                                   "id": 10609666,
                                   "first_name": "Дмитрий",
                                   "last_name": "Чайковский",
                                   "sex": 2,
                                   "nickname": "",
                                   "domain": "chaikovskyds",
                                   "photo_200_orig": "https://pp.userapi.com/c837327/v837327516/52e76/OTqhdP_YWH8.jpg",
                                   "online": 1,
                                   "can_write_private_message": 1,
                                   "last_seen": {
                                       "time": 1514142934,
                                       "platform": 7
                                   }
                               },
                               {
                                   "id": 41436791,
                                   "first_name": "Волчица",
                                   "last_name": "Дикая",
                                   "deactivated": "deleted",
                                   "sex": 1,
                                   "photo_200_orig": "https://vk.com/images/deactivated_200.png",
                                   "online": 0,
                                   "can_write_private_message": 0,
                                   "domain": "id41436791"
                               }
                           ]
                       }
                   });
                    // окно браузера
                    // var ref = cordova.InAppBrowser.open('https://twitter.github.io/typeahead.js/examples/', '_blank', 'location=yes');
                    // ref.addEventListener('loadstart', function(event) { alert(event.url); });

                    var obj = JSON.parse(object);
                    $.each(obj.response.items, function (index, value) {
                        var contactPicture = '<div class="contactPicture" style="background-image:url(' + value.photo_200_orig + ')"></div>';
                        var contactInfo  =
                            '<div class="contactInfo">'
                            + '<div class="contactName">'
                            + value.first_name
                            + '</div>'
                            +  '<div class="contactLastSeen">'
                            + value.last_name
                            + '</div>'
                            +  '<div class="contactId" data-id="'
                            + value.id
                            + '">'
                            + '</div>'
                            + '</div>';
                        $('.contact').append('<div class="contactWrapper" data-id="' +  value.id + '">' + contactPicture + contactInfo +  '</div>');
                    });
                }
            });
    } else
        {
            alert('Введите логин/пароль');
        }
    });
//контакты
    $('body').on('click', '.contactWrapper',  function () {
        $.ajax({
            method: this.method,
            url: this.action,
            data: {
                login: $('.contactWrapper').data('id')
            },
            beforeSend: function () {
            },
            error: function (data) {
            },
            complete: function () {
                $('.contactsPage').hide();
                $('.chatPage').show();
            },
            success: function (data) {
                data = {'status': 'success'};
                //нужно получить картинку и имя контакта
                var object =  JSON.stringify({
                    "response": {
                        "items": [{
                            "id": 129277,
                            "body": "ок",
                            "user_id": 32665893,
                            "from_id": 12143704,
                            "date": 1514154829,
                            "read_state": 1,
                            "out": 1,
                            "random_id": 1596552717
                        }, {
                            "id": 129276,
                            "body": "Да",
                            "user_id": 32665893,
                            "from_id": 32665893,
                            "date": 1514154827,
                            "read_state": 1,
                            "out": 0
                        }, {
                            "id": 129275,
                            "body": "базаришь",
                            "user_id": 32665893,
                            "from_id": 12143704,
                            "date": 1514154824,
                            "read_state": 1,
                            "out": 1,
                            "random_id": 2120467396
                        }, {
                            "id": 129274,
                            "body": "Пидр",
                            "user_id": 32665893,
                            "from_id": 32665893,
                            "date": 1514154823,
                            "read_state": 1,
                            "out": 0
                        }, {
                            "id": 129273,
                            "body": "Лох",
                            "user_id": 32665893,
                            "from_id": 32665893,
                            "date": 1514154820,
                            "read_state": 1,
                            "out": 0
                        }],
                        "in_read": 129277,
                        "out_read": 129277
                    }
                });
                var obj = JSON.parse(object);
                $.each(obj.response.items, function (index, value) {
                    var body = [];
                    body.push('<div class="receivedMessage' + value.out  + '">' + value.body + '</div>');
                    var contactName = value.user_id;
                    $('.messagesChat').append(body);
                    $('.nameChat').html(contactName);
                });
            }
        });
    });
//чат
     $('.textMessage').on('input', function () {

     });
});

//0. залогиниться.
//если все ок, то переходим на страницу контактов после успешного ввода данных,
//если уже залогинен, то можно по кнопке на странице контактов вернуться на экран логина.
//
//1. выбрать из списка контактов нужный контакт.
//2. при нажати на него, открывается другое окно, типа где писать "chatPage"
//3. кнопка назад к выбору контактов слева сверху.
//4. информация о контакте справа сверху
//5. посередине визуальныое отображение сообщений. "READONLY"
//если сообщение получено то отображать слева, если отослано собой, то справа
//сообщения снизу вверх уходят.


