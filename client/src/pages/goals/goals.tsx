import {useState,useEffect} from 'react';
import InputForm from "../../components/form/inputForm"
import { getGoals} from "../../utils/endpointRequests/goalEndpoints";
import ProgressBar,{goalDetails} from "../../components/progressBar/progressBar";
import createGoalFormProps from '../../utils/formSchema/goalFormSchema'
import { createMap } from '../../utils/dataShaping';

const nestData = (data:Record<string,any>[]) => {
    // child goals can't be in a map because it overwrites the key 
    let parentToDataMap = createMap(data,'parentGoal');
    let idTodataMap = createMap(data,'_id');
    let finalMap:Record<string,any> = {}

    let parentKeys = Object.keys(parentToDataMap);
    let normalKeys = Object.keys(idTodataMap)
    let usedChildKeys:Record<string,null> = {};

    for (let key of parentKeys) {
        if (key in idTodataMap) {
            let childNode = parentToDataMap[key];
            let parentNode = idTodataMap[key];
            if (!parentNode.subGoal) {
                parentNode.subGoal = []
            }
            usedChildKeys[childNode._id] = null;
            parentNode.subGoal.push(childNode)
        }
    }
    for (let key of normalKeys) {
        if (key in usedChildKeys) {
            continue;
        }
        finalMap[key] = idTodataMap[key]
    }
    console.log('FINAL',finalMap)
}


const refreshGoals = async (stateUpdate:Function) => {
    let serverResponse = await getGoals();
    if (serverResponse.status && serverResponse.data.length > 0) {
        nestData(serverResponse.data);
        stateUpdate(serverResponse.data);
    }
}

export default function Goals() {
    const [showForm,setShowForm] = useState(false);

    const [goalArr, setGoalArr] = useState([]);
    useEffect(()=>{
        refreshGoals(setGoalArr)
    },[])

    return (
        <div>
            <button onClick={e=>setShowForm(c=>!c)}> {showForm? 'Cancel':'Create'}</button>
            { showForm && <InputForm {...createGoalFormProps('base')}/>}
            {goalArr.map((goal:goalDetails)=> <ProgressBar {...goal}/>)}
        </div>
    )
}
