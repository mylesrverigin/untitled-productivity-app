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

export default function InputField(info:inputDetails) {
    let {type,name,label,className,value,placeholder,onclick,onchange} = info;

    return (
        <div className={`${className}-container`}>
            <label htmlFor={name} 
                className={`${className}-label`}>{label}</label>
            <input name={name} 
                type={type} 
                className={`${className}-input`} 
                defaultValue={value} 
                placeholder={placeholder} 
                onClick={(evt)=>{onclick(evt)}} 
                onChange={(evt)=>{onchange(evt)}}/>
        </div>
    )
}
