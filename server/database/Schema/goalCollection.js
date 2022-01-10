"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalCollection = void 0;
const databaseCollection_1 = require("./databaseCollection");
const collectionName = 'Goal';
const goalSchema = {
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
    'progress': {
        required: true,
        default: 0
    },
    'maxProgress': {
        required: true,
        default: 1
    },
    'isActive': {
        required: true,
        default: true
    },
    'createdBy': {
        required: true,
        hidden: true
    },
    'subgoal': {
        required: false
    },
    'subhabit': {
        required: false
    }
};
class goalCollection extends databaseCollection_1.DatabaseCollection {
    constructor() {
        super(collectionName, goalSchema);
    }
}
exports.goalCollection = goalCollection;
