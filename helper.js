exports.SuccessResponse = function (data = null, message = null, code = 200) {
    return { 'status': true, 'code': code, 'message': message, 'data': data };
}

exports.FailResponse = function (message = null, code = 200) {
    return { 'status': false, 'code': code, 'message': message };
}