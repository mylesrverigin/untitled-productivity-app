import createConnection from '../databaseConnection';
import errors from '../../constants/errors';
import  { ObjectId } from 'mongodb';

interface fieldProperties {
    required?:boolean,
    default?:any,
    hidden?:boolean
}

export interface databaseResponse {
    status:boolean,
    msg:string | undefined,
    data: data[] | undefined
}

type databaseSchema = Record<string,fieldProperties>;
type query = Record<string,any>;
export type data = Record<string,any>;

export class DatabaseCollection {
    databaseConnection:any | undefined;
    schema:databaseSchema;

    constructor(collectionName:string,schema:databaseSchema) {
        this.schema = schema;
        this.createDataBaseConnection(collectionName);
    }

    createDataBaseConnection = async (collectionName:string) => {
        this.databaseConnection = await createConnection(collectionName);
    }

    insert = (data:data[],strip=true):Promise<any> => {
        let response: databaseResponse = {
            status : true,
            msg : '',
            data : []
        }
        return new Promise(async (resolve,reject)=>{
            try {
                const validatedData = this.validateRequiredFieldsandDefaults(data);
                const dbResponse = await this.databaseConnection.insertMany(validatedData,{ordered:true});
                const insertedIdsMap = dbResponse['insertedIds']
                this.attachIds(insertedIdsMap,validatedData)
                if (strip) {
                    this.stripDataForExport(validatedData);
                }
                response.data = validatedData;
            } catch (e:any) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        })
    }
    
    find = (query:query,strip=true):Promise<any> => {
        let response:databaseResponse = {
            status : true,
            msg : '',
            data : []
        }
        return new Promise(async (resolve,reject)=>{
            try {
                let dataArray:data[] = await this.databaseConnection.find(query).toArray();
                if (strip) {
                    this.stripDataForExport(dataArray);
                }
                response.data = dataArray;
            } catch (e:any) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        })
    }

    findById = (id:string,strip=true):Promise<any> => {
        let response:databaseResponse = {
            status : true,
            msg : '',
            data : []
        }
        return new Promise( async (resolve,reject)=>{
            try {
                const query = {_id : new ObjectId(id)};
                let dataArray:data[] = await this.databaseConnection.find(query).toArray();
                if (strip) {
                    this.stripDataForExport(dataArray);
                }
                response.data = dataArray;
            } catch (e:any) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        })
    }

    update = (data:data):Promise<any> => {
        let response:databaseResponse = {
            status : true,
            msg : '',
            data : []
        }
        return new Promise( async (resolve,reject)=>{
            try {
                if (!data['_id']){ throw errors.MISSING_ID}
                this.stripDataForInsert([data]);
                const extractedId = this.stripId(data);

                let dbResponse = await this.databaseConnection.updateOne({_id:extractedId},{$set:{ ...data}},{upsert:false});
                if (dbResponse.modifiedCount !== 1) { throw errors.UPDATE_FAILED }
                
                this.stripDataForExport([data]);
                response.data = [{...data,_id:extractedId}];
            } catch (e:any) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        })
    }

    delete = (data:data):Promise<any> => {
        // todo bulkify
        let response:databaseResponse = {
            status : true,
            msg : '',
            data : []
        }
        return new Promise(async (resolve,reject)=>{
            try {
                if (!data._id){ throw errors.MISSING_ID}
                const query = {_id: new ObjectId(data._id)}
                const dbResponse = await this.databaseConnection.deleteMany(query);
                if (dbResponse.deletedCount !== 1){
                    throw errors.DELETE_FAILED
                }
            } catch (e:any) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        })
    }

    stripDataForInsert = (data:data[]):data[] => {
        // deletes any fields not in schema, inplace
        data.forEach((el:data)=>{
            Object.keys(el).forEach((key:string)=>{
                if (key in this.schema) {
                } else {
                    delete el[key];
                }
            }) 
        })
        return data;
    }

    stripDataForExport = (data:data[]):data[] => {
        // removes any hidden schema fields inplace
        data.forEach((el:data)=>{
            Object.keys(el).forEach((key:string)=>{
                if ( this.schema[key] && this.schema[key].hidden) {
                    delete el[key];
                }
            }) 
        })
        return data;
    }

    validateRequiredFieldsandDefaults = (data:data[]):data[] => {
        let cleanDataArr:data[] = [];
        data.forEach((el:data)=>{
            let cleanDataObj:data = {};
            Object.keys(this.schema).forEach((key:string)=>{
                if (key in el) {
                    // data exists
                    cleanDataObj[key] = el[key];
                } else if (this.schema[key].required) {
                    // data doesn't exist and is required
                    if (this.schema[key].default !== undefined) {
                        // set default value
                        cleanDataObj[key] = this.schema[key].default;
                    } else {
                        // no default can't insert
                        throw errors.MISSING_REQ_FIELD+' : '+key
                    }
                }
            })
            cleanDataArr.push(cleanDataObj);
        })
        return cleanDataArr;
    }

    stripId = (data:data) => {
        let id = new ObjectId(data._id);
        delete data._id
        return id;
    }

    attachIds = (idMap:Record<string,ObjectId>,data:data[]):void => {
        Object.keys(idMap).forEach((key:string)=>{
            let intValue = parseInt(key);
            data[intValue]['_id'] = idMap[key];
        })
    }

}
