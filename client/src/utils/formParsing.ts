export const extractFormData = (className:string) => {
    let formData:Record<string,any> = {};

    const formInputs = document.querySelectorAll(`.${className}-input`);
    const formCheckboxes = document.querySelectorAll(`.${className}-checkbox`);

    formInputs.forEach((el:any)=>{
        if (el.type !== 'button') {
            let value = el.value
            if (el.type === 'number') {
                value = parseInt(value);
            }
            formData[el.name] = value;
        }
    })
    formCheckboxes.forEach((el:any)=>{
        formData[el.name] = el.checked;
    })

    return formData;
}

export const parseDates = (datefields:string[],data:Record<string,any>) => {
    datefields.forEach((field:string)=>{
        if (data[field]) {
            data[field] = new Date(data[field]).getTime();
        }
    })
}

export const verifyFields = (requiredFields:string[],data:Record<string,any>):string[] => {
    let missingFields:string[] = [];

    requiredFields.forEach((field:string)=>{
        if (!data[field] || data[field] === null || data[field] === undefined || data[field] === '') {
            missingFields.push(field)
        }
    })

    return missingFields
}