import {useState,useEffect} from 'react';
import InputForm,{inputDetails} from "../../components/form/inputForm"
import { extractFormData,parseDates,verifyFields } from "../../utils/formParsing";
import { createGoal,getGoals} from "../../utils/endpointRequests/goalEndpoints";
import ProgressBar,{goalDetails} from "../../components/progressBar/progressBar";

const requiredFields:Record<string,string> = {
    'name':'Goal name',
    'details':'Goal details',
    'endDate':'Date goal will be completed'
};

const handleSubmit = async (evt:Event) => {
    evt.preventDefault();
    let formData = extractFormData(baseClass);
    let missingFields = verifyFields(Object.keys(requiredFields),formData);
    if (missingFields.length > 0) {
        console.log('missing',missingFields);
        return;
    }
    parseDates(['startDate','endDate'],formData)
    let serverResponse = await createGoal(formData);
}

const baseClass = 'goal'
const formData:inputDetails[] = [
    {
        type:'text',
        name:'name',
        className:baseClass,
        placeholder:'Goal name',
        onclick:(evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'text',
        name:'details',
        className:baseClass,
        placeholder:'Goal details',
        onclick:(evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'date',
        name:'startDate',
        className:baseClass,
        label:'Start Date',
        placeholder:'goal start date',
        onclick: async (evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'date',
        name:'endDate',
        className:baseClass,
        label:'End Date',
        placeholder:'goal end date',
        onclick: async (evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'number',
        name:'progress',
        className:baseClass,
        placeholder:'Current goal progress',
        onclick: async (evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'number',
        name:'maxProgress',
        className:baseClass,
        placeholder:'Max goal progress',
        onclick: async (evt:any)=>{},
        onchange:(evt:any)=>{}
    },
    {
        type:'button',
        name:'Save',
        className:baseClass,
        value:'Create Goal',
        onclick: async (evt:any)=>{handleSubmit(evt)},
        onchange:(evt:any)=>{}
    },
]

const refreshGoals = async (stateUpdate:Function) => {
    let serverResponse = await getGoals();
    if (serverResponse.status && serverResponse.data.length > 0) {
        stateUpdate(serverResponse.data);
    }
}

export default function Goals() {
    const [goalArr, setGoalArr] = useState([]);
    useEffect(()=>{
        refreshGoals(setGoalArr)
    },[])

    let props = {
        formData:formData,
        baseClass:baseClass
    }

    return (
        <div>
            goal
            <InputForm {...props}/>
            {goalArr.map((goal:goalDetails)=> <ProgressBar {...goal}/>)}
        </div>
    )
}
