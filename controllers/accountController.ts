import { FastifyRequest, FastifyReply } from 'fastify';
import { listAccounts as list } from '../services/sfdcAccounts';


interface AccountRequestBody {
    sessionId: string;
    serverUrl: string;
}

export async function listAccounts(req: FastifyRequest<{ Body: AccountRequestBody }>, reply: FastifyReply) {
    const { sessionId, serverUrl } = req.body;

    const context = { sessionId, serverUrl };

    try {
        const accounts = await list(context);
        return reply.send(accounts);
    } catch (error) {
        return reply.status(500).send({ error: 'Failed to retrieve accounts' });
    }
}
