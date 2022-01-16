import InputField from "./inputField";
import InputCheckbox from "./inputCheckbox";

export interface inputDetails {
    type:string,
    name:string,
    label?:string,
    className:string,
    value?:any
    placeholder?:string
    onclick:Function,
    onchange:Function
}

export default function inputForm(props: {formData: inputDetails[],baseClass:string}) {
    const {formData,baseClass} = props;

    return (
        <div>
            <form className={`${baseClass}-form`}>
            {formData.map((formField)=>{
                return formField.type === 'checkbox'? <InputCheckbox {...formField}/> : <InputField {...formField}/>
                })}
            </form>
        </div>
    )
}
