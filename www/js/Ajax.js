class Ajax {
    constructor(api, params = {}) {
        this.api = api;
        this.method = (params.method) ? params.method : 'get';
    }

    setData(data) {
        this.data = data;
    }

    handler(callable) {
        this.send().done(callable);
    }

    send() {
        return jQuery.ajax({
            method: this.method,
            url: this.api,
            data: this.data,
            beforeSend: function () {
             // $('.submitData').prop('disabled', true);
            },
            success: function (data) {

            },
            error: function (data) {
                console.error(data);
            },
            complete: function () {

            }
        });
    }
}