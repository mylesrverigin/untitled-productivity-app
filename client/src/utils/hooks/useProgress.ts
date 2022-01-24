import {useState,useEffect} from 'react';
import { goalDetails } from '../../components/progressBar/progressBar';
import { updateGoal } from '../endpointRequests/goalEndpoints';
import { numericFieldsToCheck } from '../constants';

const sumChildGoals = (goal:goalDetails):goalDetails => {
    let progressTotal = 0;
    let progressMaxTotal = 0;

    let destructuredGoal:goalDetails;

    if (goal.nested) {
        goal.nested.forEach((subGoal:goalDetails)=>{
            let summedSubGoal = sumChildGoals(subGoal);
            progressTotal += summedSubGoal.progress;
            progressMaxTotal += summedSubGoal.maxProgress;
        })
        destructuredGoal = {...goal,progress:progressTotal,maxProgress:progressMaxTotal}
    }else {
        destructuredGoal = {...goal}
    }

    return destructuredGoal;
}

const extractUpdate = (oldData:goalDetails,newData:Record<string,any>) => {
    let changes:Record<string,any> = {};

    if ('serverUpdate' in newData) {
        changes['serverUpdate'] = newData['serverUpdate'];
    }

    numericFieldsToCheck.forEach((field:string)=>{
        if ((field in oldData && field in newData) && (oldData as any)[field] !== newData[field]) {
            changes[field] = checkNumericDifference((oldData as any)[field],newData[field]);
        }
    })
    return changes;
}

const checkNumericDifference = (oldVal:number,newVal:number) => {
    return newVal - oldVal;
}

export const useProgress = (goal:goalDetails) => {
    if (goal.nested) {
        goal = sumChildGoals(goal);
    }
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
            let extractedUpdate = extractUpdate(goalState,update);
            setGoalState({...goalState,...update})
            setDoSave(c=>c+1)
            if (goal.updateParent) {
                goal.updateParent(extractedUpdate);
            }
        }
    }
}