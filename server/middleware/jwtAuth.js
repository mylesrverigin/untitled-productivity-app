"use strict";
const jwtUtil_1 = require("../utils/jwtUtil");
const jwtAuth = async (req, res, next) => {
    let authInfo = {
        userId: null,
        authorized: false
    };
    req['authorization'] = authInfo;
    const authHeader = req.headers.auth;
    if (!authHeader || authHeader.split(' ').length != 2) {
        // no token or incorrect format
        return next();
    }
    const decoded = (0, jwtUtil_1.decodeAuthToken)(authHeader.split(' ')[1]);
    if (decoded) {
        // attempt to get user
    }
    return next();
};
module.exports = jwtAuth;
