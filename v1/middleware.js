"use strict";

const timeLog = (req, res, next) => {
    return () => {
        console.log('Time: ', Date.now());
        next();
    };
};

module.exports = {
    timeLog
};