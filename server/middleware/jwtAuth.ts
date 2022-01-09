import {decodeAuthToken} from '../utils/jwtUtil';

interface authInfo {
    userId:string|null,
    authorized:boolean
}

const jwtAuth = async (req:any,res:any,next:any) => {
    let authInfo:authInfo = {
        userId:null,
        authorized:false
    }
    req['authorization'] = authInfo;
    
    const authHeader = req.headers.auth;
    if (!authHeader || authHeader.split(' ').length != 2){
        // no token or incorrect format
        return next()
    }
    const decoded = decodeAuthToken(authHeader.split(' ')[1]);
    
    if (decoded){
        // attempt to get user
    }
    return next()
}

export = jwtAuth;