import { config, send } from "process";
import { Http, HttpReq, HttpResp } from "./http";

export interface Context {
    sessionId: string;
    serverUrl: string;
}

function getHttpClient(context: Context) {
    return new Http({
        baseUrl: context.serverUrl,
        headers: {
            Authorization: `Bearer ${context.sessionId}`,
             'Content-Type': 'application/json'
        }
    });
}

export async function query(context: Context, soql: string): Promise<HttpResp> {
    const httpClient = getHttpClient(context);
    const req: HttpReq = {
        path: '/services/data/62.0/query',
        query: {q:soql}
    };
    return await httpClient.send(req);
}

export async function createRecord(context: Context, objectName: string, data:any) : Promise<HttpResp> {
    const httpClient = getHttpClient(context);
    const req: HttpReq = {
        path: `/services/data/v62.0/sobjects/${objectName}/`,
        method: 'POST',
        body: JSON.stringify(data)
    }
    const resp = await httpClient.send(req);
    return JSON.parse(resp.body);
}

export async function updateRecord(context: Context, objectName: string, data: any, id: string) {
    const httpClient = getHttpClient(context);
    const req: HttpReq = {
        path: `/services/data/v62.0/sobjects/${objectName}/${id}`,
        method: 'PATCH',
        body: JSON.stringify(data)
    };
    const resp = await httpClient.send(req);
    return JSON.parse(resp.body);
}

export async function deleteRecord(context: Context, id: string, objectName: string) {
    const httpClient = getHttpClient(context);
    const req: HttpReq = {
        path: `/services/data/v62.0/sobjects/${objectName}/${id}`,
        method: 'DELETE',
    };
    const resp = await httpClient.send(req);
    return resp.statusCode;
}