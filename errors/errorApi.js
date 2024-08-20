class errorApi extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static forbiddenRequest(message) {
        return new errorApi(403, message)
    }

    static badRequest(message) {
        return new errorApi(404, message)
    }

    static internalRequest(message) {
        return new errorApi(500, message)
    }
}

module.exports = errorApi