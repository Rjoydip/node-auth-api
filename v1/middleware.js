"use strict";

module.exports.logger = (req, res, next) => {
    console.log(new Date(), req.method, req.url);
    next();
};