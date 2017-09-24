"use strict";
var HTTPStatus = require('http-status');

module.exports = (statusCode, payload, done) => {
    done(
        statusCode.toString().match(/[2]+/g) ? {
            status: statusCode,
            success: true,
            message: HTTPStatus[statusCode],
            data: payload
        } : {
            status: statusCode,
            success: false,
            message: HTTPStatus[statusCode],
            error: payload
        }
    );
};