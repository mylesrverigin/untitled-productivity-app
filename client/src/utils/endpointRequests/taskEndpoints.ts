import { sendApiRequest } from "../apiResquests";

export const createTask = async (taskInfo:Record<string,string>) => {
    let response = await sendApiRequest('POST','/task',taskInfo);
    return response;
}

export const getTasks = async () => {
    let response = await sendApiRequest('GET','/task',{});
    return response;
}

export const updateTask = async (taskInfo:Record<string,any>) => {
    let response = await sendApiRequest('PUT','/task',taskInfo);
    return response;
}

export const deleteTask = async (task:Record<string,any>) => {
    let response = await sendApiRequest('DELETE','/task',task);
    return response;
}