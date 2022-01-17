import { sendApiRequest } from "../apiResquests";

export const testEndpoint = async () => {
    let response = await sendApiRequest('GET','/test',{});
    console.log(response);
    return response;
}