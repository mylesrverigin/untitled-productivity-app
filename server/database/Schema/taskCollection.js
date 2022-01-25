"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskCollection = void 0;
const databaseCollection_1 = require("./databaseCollection");
const collectionName = 'Task';
const taskSchema = {
    '_id': {},
    'name': {
        required: true
    },
    'details': {
        required: true
    },
    'startDate': {
        required: true,
        default: Date.now()
    },
    'endDate': {
        required: true
    },
    'completed': {
        required: true,
        default: false
    },
    'isActive': {
        required: true,
        default: true,
        hidden: true
    },
    'createdBy': {
        required: true,
        hidden: true
    },
};
class taskCollection extends databaseCollection_1.DatabaseCollection {
    constructor() {
        super(collectionName, taskSchema);
    }
}
exports.taskCollection = taskCollection;
