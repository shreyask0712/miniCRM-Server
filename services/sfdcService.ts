import { Http, HttpReq, HttpResp } from "./http";

export interface Context {
    sessionId: string;
    serverUrl: string;
}

function getHttpClient(context: Context) {
    return new Http({
        baseUrl: context.serverUrl,
        headers: {
            Authorization: `Bearer ${context.sessionId}`
        }
    });
}

export async function query(context: Context, soql: string): Promise<HttpResp> {
    const httpClient = getHttpClient(context);
    const req: HttpReq = {
        path: '/services/data/52.0/query',
        query: {q:soql}
    };
    return await httpClient.send(req);
}