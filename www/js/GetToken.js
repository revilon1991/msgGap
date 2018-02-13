class GetToken {
    constructor(uuid) {
        this.uuid = uuid;
        this.statusChecker = false;
        this.token = false;
        this.description = false;
    }
    getToken() {
        let ajaxGetToken = new Ajax('http://msg.9ek.ru/get_token/vk');
        let authorization = this;

        ajaxGetToken.setData({
            uuid: this.uuid
        });

        ajaxGetToken.handler(function (data) {
            new ErrorHandler(data).read();

            authorization.saveData(data);

            authorization.handlerStatus();
        });
    }
    handlerStatus() {
        switch (this.statusChecker) {
            case 'success':
                window.localStorage.setItem('token_vk', this.token);
                break;
            case 'error':
                // console.log( this.description);
                break;
        }

    }
    saveData(data) {
        this.statusChecker = data['status'] ? data['status'] : this.statusChecker;
        this.token = data['token'] ? data['token'] : this.token;
        this.description = data['description'] ? data['description'] : this.description;
    }
}