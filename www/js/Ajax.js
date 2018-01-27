class Ajax {
    constructor(api, params = {}) {
        this.api = api;
        this.method = (params['method']) ? params['method'] : 'get';
        this.data = (params['data']) ? params['data'] : {};

        let event = (params['eventName']) ? params['eventName'] : 'ajax';
        this.event = new CustomEvent(event, {
            detail: this
        });
        this.response = null;
    }

    /**
     * Данные запроса (текущие будут перезаписаны)
     * @param data object - объект данных для запроса
     */
    setData(data) {
        this.data = data;
    }

    /**
     * Добавить данные для запроса (слияние текущих и новых)
     * @param data object - объект данных для запроса
     */
    addData(data) {
        this.data = Object.assign(this.data, data);
    }

    /**
     * Выполнить подготовленный ajax запрос
     * @param callable function - не обязательная функция callback, будет вызванна по завершению ajax запроса
     */
    handler(callable) {
        let ajax = this;

        this.send().done(function (data) {
            ajax.response = data;

            document.dispatchEvent(ajax.event);

            if (callable) {
                callable(data);
            }
        });
    }

    /**
     * Метод для множественной обработки данных с помощью массива анонимных функций
     * Для корректной обработки в каждой функции необходимо вернуть значение первого аргумента
     * @param arrayCallable array - массив callback функций, будут вызваны по очередно по завершению ajax запроса
     */
    multipleHandler(arrayCallable) {
        let ajax = this;

        this.send().done(function (data) {
            ajax.response = data;

            document.dispatchEvent(ajax.event);

            if (Array.isArray(arrayCallable)) {
                arrayCallable.forEach(function (callable) {
                    data = callable(data);
                });
            }
        });
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