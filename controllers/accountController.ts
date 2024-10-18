import { FastifyRequest, FastifyReply } from "fastify";
import { listAccounts as list } from "../services/sfdcAccounts";

export default async function listAccounts (req: FastifyRequest, res: FastifyReply) {

    const { sessionId, serverUrl } = req.body as {sessionId: string, serverUrl: string};
    const context = {sessionId, serverUrl};

    try {
        const accounts = await list(context);
        return res.send(accounts);
    } catch (err) {
        return res.status(500).send({error: 'Failed to retrieve accounts'});
    }
}