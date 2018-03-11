import { sprintf } from 'sprintf-js';
import $ from 'jquery';

$(function ($) {
    window.methods = {
        vkConnect: function () {
            console.log('vkConnect !!!');
            this.webSocket = WS.connect('ws://msg.9ek.ru:49292');

            this.webSocket.on('socket/connect', function (session) {
                let route = sprintf('app/vk/%s/%s', 'login', 'lol-kek-hah');

                session.subscribe(route, function (uri, payload) {
                    console.log('Received message', payload);
                    window.methods.vkConnect.broadcast = function (message) {
                        session.publish(route, message);
                    }
                });
            });

            this.webSocket.on('socket/disconnect', function(error){
                console.log('Disconnected for ' + error.reason + ' with code ' + error.code);
            });

            $(document).on('click', '.socket', function () {
                console.log(window.methods.vkConnect.broadcast);
                window.methods.vkConnect.broadcast('вечер в хату пацаны!');
            });
            console.log('vkConnect complete !!!');
        }
    };

    const application = {
        initialize: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        onDeviceReady: function() {
            console.log('deviceready !!!');
            window.methods.vkConnect();
        }
    };
    application.initialize();
});
