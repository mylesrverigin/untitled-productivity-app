import {hashPw} from '../../utils/pwHash';
import {DatabaseCollection,data} from './databaseCollection';

const collectionName:string  = 'User';

type userData = Record<string,any>;

const userSchema: Record<string,Record<string,any>> = {
    '_id':{
        required:false
    },
    'username':{
        required:true,
        hidden:false
    },
    'password':{
        required:true,
        hidden:true
    },
    'email':{
        required:true,
        hidden:false
    },
    'refreshversion':{
        required:true,
        default:0,
        hidden:true
    },
}

export class userCollection extends DatabaseCollection {
    constructor() {
        super(collectionName,userSchema);
    }

    insertNewUser = (newUser:userData):Promise<any> => {
        this.hashUserPw(newUser);
        return this.insert([newUser])
    }

    updateUser = (data:data):Promise<any> => {
        this.hashUserPw(data);
        return this.update(data);
    }

    hashUserPw = (userData:userData) => {
        if ('password' in userData) {
            userData['password'] = hashPw(userData['password']);
        }
    }
}