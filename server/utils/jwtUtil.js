"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeRefreshToken = exports.createRefreshToken = exports.decodeAuthToken = exports.createAuthToken = void 0;
const jwt = require('jsonwebtoken');
const createAuthToken = (data) => {
    try {
        return jwt.sign(data, process.env.SECRET_KEY_AUTH);
    }
    catch {
        return null;
    }
};
exports.createAuthToken = createAuthToken;
const createRefreshToken = (data) => {
    try {
        return jwt.sign(data, process.env.SECRET_KEY_REFRESH);
    }
    catch {
        return null;
    }
};
exports.createRefreshToken = createRefreshToken;
const decodeAuthToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY_AUTH);
    }
    catch {
        return null;
    }
};
exports.decodeAuthToken = decodeAuthToken;
const decodeRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY_REFRESH);
    }
    catch {
        return null;
    }
};
exports.decodeRefreshToken = decodeRefreshToken;
