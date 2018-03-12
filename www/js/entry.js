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
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);

    if (!window.device || !window.device.uuid) {
        window.device = {
            uuid: 'lol-kek-hah'
        };
    }

    broadcast.connect('vk');

    $(document).on('click', '.socket', function () {
        broadcast.push('вечер в хату пацаны!');
    });
}

function onPause() {}

function onResume() {}
