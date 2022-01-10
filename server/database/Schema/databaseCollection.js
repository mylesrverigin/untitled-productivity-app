"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseCollection = void 0;
const databaseConnection_1 = __importDefault(require("../databaseConnection"));
const errors_1 = __importDefault(require("../../constants/errors"));
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
                // add id to records for return
                console.log(dbResponse);
                response.data = validatedData;
            }
            catch (e) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        });
    };
    find = (query) => {
        let response = {
            status: true,
            msg: '',
            data: []
        };
        return new Promise(async (resolve, reject) => {
            try {
                let dataArray = await this.databaseConnection.find(query).toArray();
                dataArray = this.stripDataForExport(dataArray);
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
    };
    delete = (data) => {
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
}
exports.DatabaseCollection = DatabaseCollection;
