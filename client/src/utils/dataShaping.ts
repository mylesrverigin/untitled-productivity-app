export const createMap = (records:Record<string,any>[],key:string) => {
    let finalMap:Record<string,Record<string,any>> = {}
    records.forEach((record)=>{
        if (key in record) {
            finalMap[record[key]] = {...record};
        }
    })

    return finalMap;
}