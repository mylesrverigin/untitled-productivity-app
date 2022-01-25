import {DatabaseCollection} from './databaseCollection';

const collectionName:string = 'Task';

const taskSchema: Record<string,Record<string,any>> = {
    '_id': {
    },
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
    'completed': {
        required:true,
        default:false
    },
    'isActive':{
        required:true,
        default:true,
        hidden:true
    },
    'createdBy':{
        required:true,
        hidden:true
    },
}

export class taskCollection extends DatabaseCollection {
    constructor() {
        super(collectionName,taskSchema);
    }
}