import createConnection from '../databaseConnection';
import errors from '../../constants/errors';

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

    insert = (data:data[]):Promise<any> => {
        let response: databaseResponse = {
            status : true,
            msg : '',
            data : []
        }
        return new Promise(async (resolve,reject)=>{
            try {
                const validatedData = this.validateRequiredFieldsandDefaults(data);
                const dbResponse = await this.databaseConnection.insertMany(validatedData,{ordered:true});
                // add id to records for return
                console.log(dbResponse);
                response.data = validatedData;
            } catch (e:any) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        })
    }
    
    find = (query:query):Promise<any> => {
        let response:databaseResponse = {
            status : true,
            msg : '',
            data : []
        }
        return new Promise(async (resolve,reject)=>{
            try {
                let dataArray:data[] = await this.databaseConnection.find(query).toArray();
                dataArray = this.stripDataForExport(dataArray);
                response.data = dataArray;
            } catch (e:any) {
                response.status = false;
                response.msg = e;
            }
            resolve(response);
        })
    }

    update = (data:data[]) => {

    }

    delete = (data:data[]) => {

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

}
