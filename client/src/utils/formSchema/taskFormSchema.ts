import { extractFormData,parseDates,verifyFields } from "../../utils/formParsing";
import { createTask } from "../endpointRequests/taskEndpoints";

const callout = async (data:Record<string,any>) => {
    let response = await createTask(data);
    return response;
}

const returnFormData = (baseClass:string,calloutFunction:Function=callout) => {
    baseClass = 'CL-'+baseClass;

    const requiredFields:Record<string,string> = {
        'name':'Task name',
        'details':'Task details',
        'endDate':'Date task will be completed'
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
        calloutFunction(formData);
    }

    return  {
        baseClass : baseClass,
        formData:[
        {
            type:'text',
            name:'name',
            className:baseClass,
            placeholder:'Task name',
            onclick:(evt:any)=>{},
            onchange:(evt:any)=>{}
        },
        {
            type:'text',
            name:'details',
            className:baseClass,
            placeholder:'Task details',
            onclick:(evt:any)=>{},
            onchange:(evt:any)=>{}
        },
        {
            type:'date',
            name:'startDate',
            className:baseClass,
            label:'Start Date',
            placeholder:'Task start date',
            onclick: async (evt:any)=>{},
            onchange:(evt:any)=>{}
        },
        {
            type:'date',
            name:'endDate',
            className:baseClass,
            label:'End Date',
            placeholder:'Task end date',
            onclick: async (evt:any)=>{},
            onchange:(evt:any)=>{}
        },
        {
            type:'button',
            name:'Save',
            className:baseClass,
            value:'Create Task',
            onclick: async (evt:any)=>{handleSubmit(evt)},
            onchange:(evt:any)=>{}
        },
    ]}
}

export default returnFormData;