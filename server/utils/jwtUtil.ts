const jwt = require('jsonwebtoken');

interface tokenData {
    id:string,
    version:number
}

const createAuthToken = (data:tokenData):string | null => {
    try {
        return jwt.sign(data, process.env.SECRET_KEY_AUTH)
    }catch {
        return null;
    }
}

const createRefreshToken = (data:tokenData):string | null => {
    try {
        return jwt.sign(data, process.env.SECRET_KEY_REFRESH)
    }catch {
        return null;
    }
}

const decodeAuthToken = (token:string):tokenData | null => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY_AUTH);
    }catch {
        return null
    }
}

const decodeRefreshToken = (token:string):tokenData | null => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY_REFRESH);
    }catch {
        return null
    }
}

export { createAuthToken, decodeAuthToken, createRefreshToken, decodeRefreshToken, tokenData};