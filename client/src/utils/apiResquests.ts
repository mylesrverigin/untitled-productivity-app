import axios from "axios";
import { getEnvVars } from "./envVars";

const createHeader = ():Record<string,string> => {
    let baseHeader:Record<string,string> = {
        'Content-Type': 'application/json'
    }
    const token = localStorage.getItem('untitledAuth');
    if (!token){ return baseHeader}
    baseHeader['auth'] = 'bearer '+ token

    return baseHeader;
}

const setAuthToken = (token:string) => {
    localStorage.setItem('untitledAuth',token);
}
const setRefreshToken = (token:string) => {
    localStorage.setItem('untitledRefresh',token);
}

const requestCreator = (requestType:string,endpoint:string,data:Record<any,any>) => {
    const url = `${getEnvVars()['BASE_URL']}${endpoint}`;
    switch (requestType) {
        case 'POST':
            return axios.post(url,data,{headers:createHeader()});
        case 'GET':
            return axios.get(url,{headers:createHeader()});
        case 'PUT':
            return axios.put(url,data,{headers:createHeader()});
        case 'DELETE':
            return axios.delete(url+`/${data._id}`,{headers:createHeader()})
        default:
            break;
    }
}

const sendApiRequest = (method:string,endpoint:string,data:Record<any,any>):Record<any,any> => {
    return new Promise((resolve,reject)=>{
        // @ts-ignore
        requestCreator(method,endpoint,data)
        .then((res)=>{
            resolve(res.data);
        })
        .catch((err)=>{
            resolve(err.response.data);
        })
    })
}


export {setAuthToken,setRefreshToken,sendApiRequest}