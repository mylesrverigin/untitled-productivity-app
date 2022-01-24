import { sendApiRequest } from "../apiResquests";

export const createGoal = async (goalInfo:Record<string,string>) => {
    let response = await sendApiRequest('POST','/goal',goalInfo);
    return response;
}

export const getGoals = async () => {
    let response = await sendApiRequest('GET','/goal',{});
    return response;
}

export const updateGoal = async (goalInfo:Record<string,any>) => {
    let response = await sendApiRequest('PUT','/goal',goalInfo);
    return response;
}

export const deleteGoal = async (goalInfo:Record<string,any>) => {
    let response = await sendApiRequest('DELETE','/goal',goalInfo);
    return response;
}