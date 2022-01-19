import {useState} from 'react'
import { useProgress } from '../../utils/hooks/useProgress'
import { deleteGoal } from '../../utils/endpointRequests/goalEndpoints'
import './progressBar.scss'
import createGoalFormProps from '../../utils/formSchema/goalFormSchema';
import InputForm from '../form/inputForm';
import { createGoal } from '../../utils/endpointRequests/goalEndpoints';

export interface goalDetails {
    name:string,
    details:string,
    startDate:number,
    endDate:number,
    isActive?:boolean,
    _id:string,
    progress:number,
    maxProgress:number,
    subgoal?:string,
    subhabit?:string,
    nested?:goalDetails[]
}

const getWidthPercentage = (a:number,b:number) => {
    const percentage = ((a/b)*100).toFixed(0);
    return percentage + '%'
}

const normalizeDates = (start:number,end:number) => {
    if (start > end){ return getWidthPercentage(1,1)}

    const totalInterval = end - start;
    const currentInterval = end - Date.now();
    
    return getWidthPercentage((totalInterval-currentInterval),totalInterval);
}

const doDelete = (goal:Record<string,any>) => {
    deleteGoal(goal);
}

export default function ProgressBar(goalInfo:goalDetails) {
    const [createSubGoal,setCreateSubGoal] = useState(false);
    const {goalState,setGoalState} = useProgress(goalInfo);
    const [toggleSubGoal,setToggleSubGoal] = useState(true);
    const hasSubGoal = !!goalState.nested;

    const formCallout = async (data:Record<string,any>) => {
        data['parentGoal'] = goalState._id;
        const serverResponse = await createGoal(data);
        if (serverResponse.status && serverResponse.data.length > 0) {
            // setGoalState or refresh page
        }
    }

    const formProps = createGoalFormProps(goalState._id,formCallout);

    return (
        <div className='progress-bar'>
            <p className='heading'> {goalState.name} </p>
            <p className='bar-heading'> Progress</p>
            <div className='edit-button'>
                <button onClick={()=>{doDelete(goalState)}}>delete</button>
                <button onClick={()=>{setGoalState({progress:goalState.progress-1})}}>-</button>
                <p> {goalState.progress}/{goalState.maxProgress} </p>
                <button onClick={()=>{setGoalState({progress:goalState.progress+1})}}>+</button>
            </div>
            <div className='bar-progress'>
                <div className='progress' 
                    style={{width:getWidthPercentage(goalState.progress,goalState.maxProgress)}}></div>
            </div>

            <p className='bar-heading'> Time Elapsed {`start: ${new Date(goalState.startDate).toLocaleDateString()}  end: ${new Date(goalState.endDate).toLocaleDateString()}`}</p>
            <div className='bar-time'>
                <div className='progress-time'
                    style={{width:normalizeDates(goalState.startDate,goalState.endDate)}}></div>
            </div>
            <div className='sub-goal-create'>
                <button onClick={e=>setCreateSubGoal(c=>!c)}>{createSubGoal? 'Cancel':'Show'}</button>
                {createSubGoal && goalState._id && <InputForm {...formProps}/>}
            </div>
            {hasSubGoal && <div className='sub-goal-display'>
                <button onClick={e=>setToggleSubGoal(c=>!c)}>{toggleSubGoal? 'Hide':'Show'}</button>
                {toggleSubGoal && goalState.nested?.map((el:goalDetails)=><ProgressBar {...el}/>)}
            </div>}
        </div>
    )
}
