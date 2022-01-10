"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.hashPw = void 0;
const bcrypt = require('bcrypt');
const hashPw = (pw) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pw, salt);
};
exports.hashPw = hashPw;
const compareHash = (pw, hashPw) => {
    return bcrypt.compareSync(pw, hashPw);
};
exports.compareHash = compareHash;
