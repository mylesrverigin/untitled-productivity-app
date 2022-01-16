"use strict";
const jwtUtil_1 = require("../utils/jwtUtil");
const userCollection_1 = require("../database/Schema/userCollection");
const UserSchema = new userCollection_1.userCollection();
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
        let serverResponse = await UserSchema.findById(decoded.id, false);
        if (serverResponse.status && serverResponse.data.length > 0 && serverResponse.data[0].refreshversion === decoded.version) {
            authInfo.authorized = true;
            authInfo.userId = decoded.id;
        }
    }
    console.log(req.authorization);
    return next();
};
module.exports = jwtAuth;
