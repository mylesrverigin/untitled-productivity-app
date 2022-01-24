import {useState,useEffect} from 'react';
import InputForm from "../../components/form/inputForm"
import { getGoals} from "../../utils/endpointRequests/goalEndpoints";
import ProgressBar,{goalDetails} from "../../components/progressBar/progressBar";
import createGoalFormProps from '../../utils/formSchema/goalFormSchema'
import { createMap } from '../../utils/dataShaping';

const nestData = (data:Record<string,any>[]) => {
    let idTodataMap = createMap(data,'_id');
    let childKeysSeen:Record<string,null> = {}
    let finalList:Record<string,any>[] = [];

    let filteredGoals = Object.values(idTodataMap);

    filteredGoals.forEach((el:Record<string,any>)=>{
        let parentKey = el['parentGoal'];
        if ( parentKey && parentKey in idTodataMap) {
            childKeysSeen[el._id] = null;
            if (!idTodataMap[parentKey].nested) {
                idTodataMap[parentKey].nested = [];
            }
            idTodataMap[parentKey].nested.push(el);
        }
    })

    filteredGoals.forEach((el:Record<string,any>)=>{
        if ( childKeysSeen[el._id] !== null) {
            // goal without parent
            finalList.push(el);
        }
    })
    return finalList;
    
}


const refreshGoals = async (stateUpdate:Function) => {
    let serverResponse = await getGoals();
    if (serverResponse.status && serverResponse.data.length > 0) {
        let nestedGoals = nestData(serverResponse.data);
        stateUpdate(nestedGoals);
        console.log('ran refresh',serverResponse)
    }
}


export default function Goals() {
    const [showForm,setShowForm] = useState(false);
    const [hideGoals,setHideGoals] = useState(false);

    const [goalArr, setGoalArr] = useState([]);
    useEffect(()=>{
        refreshGoals(setGoalArr)
    },[])

    
    const topLevelUpdateFunction = async (data:Record<string,any>) => {
        console.log('top level recieved Update',data);
        if ('serverUpdate' in data) {
            setHideGoals(true);
            await refreshGoals(setGoalArr);
            setHideGoals(false);
        }
    }

    return (
        <div>
            <button onClick={e=>setShowForm(c=>!c)}> {showForm? 'Cancel':'Create'}</button>
            { showForm && <InputForm {...createGoalFormProps('base')}/>}
            {!hideGoals && goalArr.map((goal:goalDetails)=> <ProgressBar {...goal} {...{updateParent:topLevelUpdateFunction}}/>)}
        </div>
    )
}
