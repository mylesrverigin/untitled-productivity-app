import { sendApiRequest,setAuthToken } from "../apiResquests";

const loginUser = async (loginInfo:Record<string,string>) => {
    let response = await sendApiRequest('POST','/user/login',loginInfo);
    if (response.status && response.data.length > 0 && response.data[0].token) {
        setAuthToken(response.data[0].token);
    }
    return response;
}

const signupUser = async (signupInfo:Record<string,string>) => {
    let response = await sendApiRequest('POST','/user',signupInfo);
    if (response.status && response.data.length > 0 && response.data[0].token) {
        setAuthToken(response.data[0].token);
    }
    return response;
}

const getUserInfo = async () => {
    let response = await sendApiRequest('GET','/user',{});
    console.log(response);
    return response;
}

export {loginUser,signupUser,getUserInfo}