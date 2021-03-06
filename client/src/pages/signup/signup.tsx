import InputForm,{inputDetails} from "../../components/form/inputForm"
import { extractFormData } from "../../utils/formParsing";
import { signupUser } from "../../utils/endpointRequests/userEndpoints";

const baseClass = 'signup';
const formData:inputDetails[] = [
    {
        type:'text',
        name:'username',
        className:baseClass,
        placeholder:'Username',
        onclick:(evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'email',
        name:'email',
        className:baseClass,
        placeholder:'Email',
        onclick:(evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'password',
        name:'password',
        className:baseClass,
        placeholder:'Password',
        onclick:(evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'password',
        name:'passwordConfirm',
        className:baseClass,
        placeholder:'Confirm Password',
        onclick:(evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'button',
        name:'signup',
        className:baseClass,
        value:'signup',
        onclick:async (evt:any)=>{
            evt.preventDefault();
            let formData = extractFormData('signup');
            let serverResonse = await signupUser(formData);
            console.log(serverResonse);
        },
        onchange:(evt:any)=>{}
    },
]


export default function Signup() {
    let props = {
        formData:formData,
        baseClass:baseClass
    }
    
    return (
        <div>
            <InputForm {...props}/>
        </div>
    )
}
