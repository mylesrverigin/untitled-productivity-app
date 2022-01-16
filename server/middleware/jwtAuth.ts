import {decodeAuthToken} from '../utils/jwtUtil';
import { userCollection } from '../database/Schema/userCollection';

const UserSchema = new userCollection();

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
        let serverResponse = await UserSchema.findById(decoded.id,false);
        if (serverResponse.status && serverResponse.data.length > 0 && serverResponse.data[0].refreshversion === decoded.version) {
            authInfo.authorized = true;
            authInfo.userId = decoded.id;
        }
    }
    console.log(req.authorization)
    return next()
}

export = jwtAuth;