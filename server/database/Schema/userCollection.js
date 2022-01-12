"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCollection = void 0;
const pwHash_1 = require("../../utils/pwHash");
const databaseCollection_1 = require("./databaseCollection");
const collectionName = 'User';
const userSchema = {
    '_id': {
        required: false
    },
    'username': {
        required: true,
        hidden: false
    },
    'password': {
        required: true,
        hidden: true
    },
    'email': {
        required: true,
        hidden: false
    },
    'refreshversion': {
        required: true,
        default: 0,
        hidden: true
    },
};
class userCollection extends databaseCollection_1.DatabaseCollection {
    constructor() {
        super(collectionName, userSchema);
    }
    insertNewUser = (newUser) => {
        this.hashUserPw(newUser);
        return this.insert([newUser]);
    };
    updateUser = (data) => {
        this.hashUserPw(data);
        return this.update(data);
    };
    hashUserPw = (userData) => {
        if ('password' in userData) {
            userData['password'] = (0, pwHash_1.hashPw)(userData['password']);
        }
    };
}
exports.userCollection = userCollection;
