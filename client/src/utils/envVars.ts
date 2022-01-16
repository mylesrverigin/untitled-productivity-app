let storedVars:Record<string,string> = {}

export const updateVarMap = (key:string,value:string) => {
    storedVars[key] = value;
}

export const getEnvVars = ():Record<string,string> => {
    return storedVars;
}

