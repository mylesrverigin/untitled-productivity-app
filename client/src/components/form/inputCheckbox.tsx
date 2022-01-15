import { inputDetails } from "./inputField"

export default function InputCheckbox(info:inputDetails) {
    let {name,label,className,value,onclick,onchange} = info;

    return (
        <div className={`${className}-container`}>
            <label htmlFor={name} 
                className={`${className}-label`}>{label}</label>
            <input name={name} 
                type='checkbox' 
                className={`${className}-checkbox`} 
                checked={value} 
                onClick={(evt)=>{onclick(evt)}} 
                onChange={(evt)=>{onchange(evt)}}/>
        </div>
    )
}
