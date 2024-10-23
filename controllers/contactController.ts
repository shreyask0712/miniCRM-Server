import { listContacts as list } from "../services/sfdcContacts";
import { createContacts as create } from "../services/sfdcContacts";
import { updateContacts as update } from "../services/sfdcContacts";
import { deleteContacts as del } from "../services/sfdcContacts";
import { FastifyRequest, FastifyReply } from "fastify";

interface ContactRequestBody {
    sessionId: string;
    serverUrl: string;
    contact: any;
}

interface ContactData {
    FirstName: string;
    LastName: string;
    Email: string;
    AccountId: string;
}

interface ParamsWithId {
    id: string;
}

export async function listContacts(req: FastifyRequest<{Body: ContactRequestBody}>, res: FastifyReply) {
    const {sessionId, serverUrl} = req.body;
    const context = {sessionId, serverUrl};
    try {
        const contacts = await list(context);
        return res.send(contacts);
    } catch (err) {
        return res.status(500).send({err: "Failed to retrieve Contacts"});
    }
}

export async function createContacts(req: FastifyRequest<{Body: ContactRequestBody & ContactData}>, res: FastifyReply) {
    const {sessionId, serverUrl, contact} = req.body;
    const context = {sessionId, serverUrl};
    const ContactData = {
        FirstName: contact.FirstName,
        LastName: contact.LastName,
        Email: contact.Email,
        AccountId: contact.AccountId
    }
    try {
        const result = await create(context, ContactData);
        return res.send(result);
    } catch (err) {
        return res.status(500).send({err: 'Failed to create contact'});
    }
}

export async function updateContacts(req: FastifyRequest<{Body: ContactData & ContactRequestBody,Params: ParamsWithId}>, res: FastifyReply) {
    const {sessionId, serverUrl, contact} = req.body;
    const id = req.params.id;
    const context = {sessionId, serverUrl};
    const ContactData = {
        FirstName: contact.FirstName,
        LastName: contact.LastName,
        Email: contact.Email,
        AccountId: contact.AccountId
    }

    try {
        const result = await update(context, ContactData, id);
        return res.send(result);
    } catch (err) {
        return res.status(500).send({err: 'Failed to update contact'});
    }
}

export async function deleteContacts(req: FastifyRequest<{Body: ContactRequestBody,Params: ParamsWithId}>, res: FastifyReply) {
    const {sessionId, serverUrl} = req.body;
    const {id}= req.params;
    const context = {sessionId, serverUrl};

    try {
        const result = await del(context, id);
        return res.send(result);
    } catch (err) {
        return res.status(500).send({err: 'Failed to delete contact'});
    }
}