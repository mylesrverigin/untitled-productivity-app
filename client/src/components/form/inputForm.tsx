import InputField, {inputDetails} from "./inputField";
import InputCheckbox from "./inputCheckbox";

export default function inputForm() {
    let inputs:inputDetails = {
        type:'checkbox',
        name:'test',
        className:'test',
        value:'true',
        onclick:(evt:any)=>{console.log(evt.target.value)},
        onchange:(evt:any)=>{console.log('change')}
    }

    let inputs2:inputDetails = {
        type:'checkbox',
        name:'test',
        label:'one',
        className:'test',
        value:true,
        onclick:(evt:any)=>{console.log(evt.target.value)},
        onchange:(evt:any)=>{console.log('change')}
    }

    return (
        <div>
            form
            <InputField {...inputs}/>
            <InputCheckbox {...inputs2}/>
        </div>
    )
}
