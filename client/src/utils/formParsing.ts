export const extractFormData = (className:string) => {
    let formData:Record<string,any> = {};

    const formInputs = document.querySelectorAll(`.${className}-input`);
    const formCheckboxes = document.querySelectorAll(`.${className}-checkbox`);

    formInputs.forEach((el:any)=>{
        if (el.type !== 'button') {
            formData[el.name] = el.value;
        }
    })
    formCheckboxes.forEach((el:any)=>{
        formData[el.name] = el.checked;
    })

    return formData;
}