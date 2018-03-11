import { sprintf } from 'sprintf-js';
import $ from 'jquery';

let broadcast = {
    connect: function(channel) {
        let webSocket = WS.connect('ws://msg.9ek.ru:49292'),
            self = this;

        webSocket.on('socket/connect', function (session) {
            let route = sprintf('app/%s/%s', channel, window.device.uuid);

            session.subscribe(route, function (uri, payload) {
                console.log('Received message', payload);
            });

            self.push = function (message) {
                session.publish(route, message);
            };
        });

        webSocket.on('socket/disconnect', function(error){
            console.log('Disconnected for ' + error.reason + ' with code ' + error.code);
        });
    }
};

let application = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    onDeviceReady: function() {
        window.device.uuid = window.device.uuid ? window.device.uuid : 'lol-kek-hah';
    },
};
application.initialize();

$(function ($) {
    broadcast.connect('vk');
    $(document).on('click', '.socket', function () {
        broadcast.push('вечер в хату пацаны!');
    });
});