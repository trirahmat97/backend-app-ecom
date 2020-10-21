exports.ok = (values, message) => {
    return {
        resCode: '200',
        resDesc: message,
        values
    }
}

exports.create = (value, message) => {
    return {
        resCode: '201',
        resDesc: message,
        value
    };
}

exports.update = (value, message) => {
    return {
        resCode: '204',
        resDesc: message,
        value
    };
}

exports.delete = (message) => {
    return {
        resCode: '203',
        resDesc: message
    };
}

exports.bad = (message) => {
    return {
        resCode: '400',
        resDesc: message
    }
}

exports.unauthorized = () => {
    return {
        resCode: '401',
        resDesc: 'Unauthorized!'
    }
}

exports.forbiden = () => {
    return {
        resCode: '403',
        resDesc: 'Forbiden!'
    }
}

exports.general = (message) => {
    return {
        resCode: '500',
        resDesc: 'General Error!',
        message
    }
}

exports.notfound = (message) => {
    return {
        resCode: '404',
        resDesc: message
    }
}

exports.getData = (value, message) => {
    return {
        resCode: '200',
        resDesc: message,
        value
    }
}

exports.duplicate = (message) => {
    return {
        resCode: '429',
        resDesc: message,
    }
}