import { FastifyRequest, FastifyReply } from 'fastify';
import { listAccounts as list } from '../services/sfdcAccounts';
import { createAccounts as create } from '../services/sfdcAccounts';
import { updateAccounts as update } from '../services/sfdcAccounts';
import { deleteAccounts as del } from '../services/sfdcAccounts';


interface AccountRequestBody {
    sessionId: string;
    serverUrl: string;
}

interface AccountData {
    Name: string;
    BillingStreet?: string;
    BillingCity?: string;
    BillingState?: string;
    BillingPostalCode?: string;
    Website?: string;
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

export async function createAccount(req: FastifyRequest<{Body: AccountRequestBody & AccountData}>, res: FastifyReply) {
    const {sessionId, serverUrl, ...AccountData} = req.body;
    const context = {sessionId, serverUrl};

    try {
        const result = await create(context, AccountData);
        return res.send(result);
    } catch (err) {
        return res.status(500).send({err: 'Failed to create account'});
    }
}

export async function updateAccount(req: FastifyRequest<{ Body: AccountRequestBody & { id: string } & AccountData }>, res: FastifyReply) {
    const { sessionId, serverUrl, id, ...accountData } = req.body;
    const context = { sessionId, serverUrl };

    try {
        const result = await update(context, accountData, id);
        return res.send(result);
    } catch (error) {
        return res.status(500).send({ error: 'Failed to update account' });
    }
}

export async function deleteAccount(req: FastifyRequest<{Body: AccountRequestBody & {id: string}}>, res: FastifyReply) {
    const {sessionId, serverUrl, id} = req.body;
    const context = {sessionId, serverUrl};

    try {
        const result = await del(context, id);
        return res.send(result);
    } catch (err) {
        return res.status(500).send({err: 'Failed to delete account'});
    }
}