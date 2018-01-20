class ErrorHandler {
    constructor(response) {
        this.response = response;
    }

    read() {
        if (this.response && this.response.error) {
            console.error(this.response);
        }
    }
}
