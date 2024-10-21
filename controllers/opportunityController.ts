import { listOpportunities  as list, createOpportunities as create, updateOpportunities as update, deleteOpportunity as del} from "../services/sfdcOpportunities";
import { FastifyRequest, FastifyReply } from "fastify";

interface OpportunityReqBody {
    sessionId: string;
    serverUrl: string;
}

interface OpportunityData {
    Name: string;
    StageName: string;
    Amount: string;
    AccountId: string;
}

interface ParamsWithId {
    id: string;
}

export async function listOpportunities(req: FastifyRequest<{Body: OpportunityReqBody}>, res: FastifyReply) {
    const {sessionId, serverUrl} = req.body;
    const context = {sessionId, serverUrl};
    const opportunities = await list(context);
    return res.send(opportunities);
}

export async function createOpportunities(req: FastifyRequest<{Body: OpportunityData &  OpportunityReqBody}>, res: FastifyReply) {
    const {sessionId, serverUrl, ...OpportunityData} = req.body;
    const context = {sessionId, serverUrl};

    try {
        const result = await create(context, OpportunityData);
        return res.send(result);
    } catch (err) {
        return res.status(500).send({err: 'Failed to create opportunity'});
    }
}

export async function updateOpportunities(req: FastifyRequest<{Body: OpportunityReqBody & OpportunityData, Params: ParamsWithId}>, res: FastifyReply) {
    const {sessionId, serverUrl, ...OpportunityData} = req.body;
    const id = req.params.id;
    const context = {sessionId, serverUrl};

    try {
        const result = await update(context, OpportunityData, id);
        return res.send(result);
    } catch (err) {
        return res.status(500).send({err: 'Failed to update opportunity'});
    }
}

export async function deleteOpportunity(req: FastifyRequest<{Body: OpportunityReqBody,Params: ParamsWithId}>, res: FastifyReply) {
    const {sessionId, serverUrl} = req.body;
    const id = req.params.id;
    const context = {sessionId, serverUrl};

    try {
        const result = await del(context, id);
        return res.send(result);
    } catch (err) {
        return res.status(500).send({err: 'Failed to delete opportunity'});
    }
}
