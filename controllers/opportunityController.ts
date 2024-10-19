import { listOpportunities  as list} from "../services/sfdcOpportunities";
import { FastifyRequest, FastifyReply } from "fastify";

interface OpportunityReqBody {
    sessionId: string;
    serverUrl: string;
}

export async function listOpportunities(req: FastifyRequest<{Body: OpportunityReqBody}>, res: FastifyReply) {
    const opportunities = await list(req.body);
    return res.send(opportunities);
}

