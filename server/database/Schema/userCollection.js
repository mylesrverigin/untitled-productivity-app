"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCollection = void 0;
const pwHash_1 = require("../../utils/pwHash");
const databaseCollection_1 = require("./databaseCollection");
const collectionName = 'User';
const userSchema = {
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
    }
};
class userCollection extends databaseCollection_1.DatabaseCollection {
    constructor() {
        super(collectionName, userSchema);
    }
    insertNewUser = (newUser) => {
        newUser['password'] = (0, pwHash_1.hashPw)(newUser['password']);
        return new Promise(async (resolve, reject) => {
            const userToInsert = { ...newUser };
            const dbResponse = await this.insert([userToInsert]);
            resolve(dbResponse);
        });
    };
}
exports.userCollection = userCollection;
