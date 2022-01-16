import InputForm,{inputDetails} from "../../components/form/inputForm"
import { extractFormData } from "../../utils/formParsing";
import { loginUser } from "../../utils/endpointRequests/userEndpoints";

const baseClass = 'login'
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
        type:'password',
        name:'password',
        className:baseClass,
        placeholder:'Password',
        onclick:(evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'button',
        name:'Login',
        className:baseClass,
        value:'Login',
        onclick: async (evt:any)=>{
            evt.preventDefault();
            let formData = extractFormData(baseClass);
            let serverinfo = await loginUser(formData);
            console.log(serverinfo);
        },
        onchange:(evt:any)=>{}
    },
]

export default function Login() {
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
