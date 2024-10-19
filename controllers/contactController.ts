import { listContacts as list } from "../services/sfdcContacts";
import { FastifyRequest, FastifyReply } from "fastify";

export interface ContactRequestBody {
    sessionId: string;
    serverUrl: string;
}

export async function listContacts(req: FastifyRequest<{Body: ContactRequestBody}>, res: FastifyReply) {
    try {
        const contacts = await list(req.body);
        return res.send(contacts);
    } catch (err) {
        return res.status(500).send({err: "Failed to retrieve Contacts"});
    }
}