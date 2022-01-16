import { sendApiRequest,setAuthToken,setRefreshToken } from "../apiResquests";

// sendApiRequest = (endpoint:string,method:string,data:Record<any,any>)

const loginUser = async (loginInfo:Record<string,string>) => {
    let response = await sendApiRequest('POST','/user/login',loginInfo);
    console.log(response.data);
}

const signupUser = () => {

}

export {loginUser,signupUser}