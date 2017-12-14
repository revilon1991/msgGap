var request = 'http://msg.9ek.ru/';

jQuery(function ($) {
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

jQuery(function ($) {
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