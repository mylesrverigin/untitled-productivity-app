import {hashPw} from '../../utils/pwHash';
import {DatabaseCollection,data,databaseResponse} from './databaseCollection';

const collectionName:string  = 'User';

type userData = Record<string,any>;

const userSchema: Record<string,Record<string,any>> = {
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
    }
}

export class userCollection extends DatabaseCollection {
    constructor() {
        super(collectionName,userSchema);
    }

    insertNewUser = (newUser:userData):Promise<any> => {
        newUser['password'] = hashPw(newUser['password']);
        return new Promise(async(resolve,reject)=>{
            const userToInsert:data = { ...newUser};
            const dbResponse:databaseResponse =  await this.insert([userToInsert])
            resolve(dbResponse);
        })
        
    }
}