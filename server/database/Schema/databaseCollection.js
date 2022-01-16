"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseCollection = void 0;
const databaseConnection_1 = __importDefault(require("../databaseConnection"));
const errors_1 = __importDefault(require("../../constants/errors"));
const mongodb_1 = require("mongodb");
class DatabaseCollection {
    databaseConnection;
    schema;
    constructor(collectionName, schema) {
        this.schema = schema;
        this.createDataBaseConnection(collectionName);
    }
    createDataBaseConnection = async (collectionName) => {
        this.databaseConnection = await (0, databaseConnection_1.default)(collectionName);
    };
    insert = (data) => {
        let response = {
            status: true,
            msg: '',
            data: []
        };
        return new Promise(async (resolve, reject) => {
            try {
                const validatedData = this.validateRequiredFieldsandDefaults(data);
                const dbResponse = await this.databaseConnection.insertMany(validatedData, { ordered: true });
                const insertedIdsMap = dbResponse['insertedIds'];
                this.attachIds(insertedIdsMap, validatedData);
                this.stripDataForExport(validatedData);
                response.data = validatedData;
            }
            catch (e) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        });
    };
    find = (query, strip = true) => {
        let response = {
            status: true,
            msg: '',
            data: []
        };
        return new Promise(async (resolve, reject) => {
            try {
                let dataArray = await this.databaseConnection.find(query).toArray();
                if (strip) {
                    this.stripDataForExport(dataArray);
                }
                response.data = dataArray;
            }
            catch (e) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        });
    };
    findById = (id) => {
        let response = {
            status: true,
            msg: '',
            data: []
        };
        return new Promise(async (resolve, reject) => {
            try {
                const query = { _id: new mongodb_1.ObjectId(id) };
                let dataArray = await this.databaseConnection.find(query).toArray();
                this.stripDataForExport(dataArray);
                response.data = dataArray;
            }
            catch (e) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        });
    };
    update = (data) => {
        let response = {
            status: true,
            msg: '',
            data: []
        };
        return new Promise(async (resolve, reject) => {
            try {
                if (!data['_id']) {
                    throw errors_1.default.MISSING_ID;
                }
                this.stripDataForInsert([data]);
                const extractedId = this.stripId(data);
                let dbResponse = await this.databaseConnection.updateOne({ _id: extractedId }, { $set: { ...data } }, { upsert: false });
                if (dbResponse.modifiedCount !== 1) {
                    throw errors_1.default.UPDATE_FAILED;
                }
                this.stripDataForExport([data]);
                response.data = [{ ...data, _id: extractedId }];
            }
            catch (e) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        });
    };
    delete = (data) => {
        // todo bulkify
        let response = {
            status: true,
            msg: '',
            data: []
        };
        return new Promise(async (resolve, reject) => {
            try {
                if (!data._id) {
                    throw errors_1.default.MISSING_ID;
                }
                const query = { _id: new mongodb_1.ObjectId(data._id) };
                const dbResponse = await this.databaseConnection.deleteMany(query);
                if (dbResponse.deletedCount !== 1) {
                    throw errors_1.default.DELETE_FAILED;
                }
            }
            catch (e) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        });
    };
    stripDataForInsert = (data) => {
        // deletes any fields not in schema, inplace
        data.forEach((el) => {
            Object.keys(el).forEach((key) => {
                if (key in this.schema) {
                }
                else {
                    delete el[key];
                }
            });
        });
        return data;
    };
    stripDataForExport = (data) => {
        // removes any hidden schema fields inplace
        data.forEach((el) => {
            Object.keys(el).forEach((key) => {
                if (this.schema[key] && this.schema[key].hidden) {
                    delete el[key];
                }
            });
        });
        return data;
    };
    validateRequiredFieldsandDefaults = (data) => {
        let cleanDataArr = [];
        data.forEach((el) => {
            let cleanDataObj = {};
            Object.keys(this.schema).forEach((key) => {
                if (key in el) {
                    // data exists
                    cleanDataObj[key] = el[key];
                }
                else if (this.schema[key].required) {
                    // data doesn't exist and is required
                    if (this.schema[key].default !== undefined) {
                        // set default value
                        cleanDataObj[key] = this.schema[key].default;
                    }
                    else {
                        // no default can't insert
                        throw errors_1.default.MISSING_REQ_FIELD + ' : ' + key;
                    }
                }
            });
            cleanDataArr.push(cleanDataObj);
        });
        return cleanDataArr;
    };
    stripId = (data) => {
        let id = new mongodb_1.ObjectId(data._id);
        delete data._id;
        return id;
    };
    attachIds = (idMap, data) => {
        Object.keys(idMap).forEach((key) => {
            let intValue = parseInt(key);
            data[intValue]['_id'] = idMap[key];
        });
    };
}
exports.DatabaseCollection = DatabaseCollection;
