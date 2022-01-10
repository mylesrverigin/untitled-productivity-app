import {DatabaseCollection} from './databaseCollection';

const collectionName:string = 'Goal';

const goalSchema: Record<string,Record<string,any>> = {
    'name':{
        required:true
    },
    'details':{
        required:true
    },
    'startDate':{
        required:true,
        default:Date.now()
    },
    'endDate':{
        required:true
    },
    'progress':{
        required:true,
        default:0
    },
    'maxProgress':{
        required:true,
        default:1
    },
    'isActive':{
        required:true,
        default:true
    },
    'createdBy':{
        required:true,
        hidden:true
    },
    'subgoal':{
        required:false
    },
    'subhabit':{
        required:false
    }
}

export class goalCollection extends DatabaseCollection {
    constructor() {
        super(collectionName,goalSchema);
    }
}