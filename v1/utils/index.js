"use strict";
const nodemailer = require('nodemailer');
const HTTPStatus = require('http-status');

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
    sendMail: (data, done) => {
        nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        }).sendMail({
            from: process.env.MAIL_USER,
            to: data.user.email,
            subject: data.subject,
            text: data.text,
            // html: ``
        }, (error, info) => {
            done(error, info)
        });
    }
};