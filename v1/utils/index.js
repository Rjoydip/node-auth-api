"use strict";
const nodemailer = require('nodemailer');
const HTTPStatus = require('http-status');

const {
    API_PREFIX
} = require("../configs");

module.exports = {
    resPayload: (statusCode, payload, done) => {
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
    },
    sendMail: (user, token, host, done) => {
        nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        }).sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: 'Reset your password',
            text: `Here is your reset password link. \nhttp://${host}${API_PREFIX}/auth/reset/${token}`,
            // html: ``
        }, (error, info) => {
            done(error, info)
        });
    }
};