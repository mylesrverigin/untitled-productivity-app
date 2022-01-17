import {useState,useEffect} from 'react';
import { goalDetails } from '../../components/progressBar/progressBar';
import { updateGoal } from '../endpointRequests/goalEndpoints';

export const useProgress = (goal:goalDetails) => {
    const [goalState,setGoalState] = useState(goal);
    const [doSave,setDoSave] = useState(0);

    useEffect(()=>{
        // save updated goal
        if (doSave > 0) {
            updateGoal(goalState)
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)})
        }
    },[doSave])

    return {
        goalState,
        setGoalState:(update:Record<string,any>)=>{
            setDoSave(c=>c+1)
            setGoalState({...goalState,...update})
        }
    }
}