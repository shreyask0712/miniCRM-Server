import { FastifyRequest, FastifyReply } from 'fastify';
import { listAccounts as list, createAccounts as create, updateAccounts as update, deleteAccounts as del } from '../services/sfdcAccounts';

interface AccountRequestBody {
    sessionId: string;
    serverUrl: string;
    account: any;
}

interface AccountData {
    Name: string;
    BillingStreet?: string;
    BillingCity?: string;
    BillingState?: string;
    BillingPostalCode?: string;
    Website?: string;
}

interface ParamsWithId {
    id: string;
}

export async function listAccounts(req: FastifyRequest<{ Body: AccountRequestBody }>, reply: FastifyReply) {
    const { sessionId, serverUrl } = req.body;
    console.log("req body: ",req.body);
    const context = { sessionId, serverUrl };

    try {
        const accounts = await list(context);
        return reply.send(accounts);
    } catch (error) {
        return reply.status(500).send({ error: 'Failed to retrieve accounts' });
    }
}

export async function createAccount(req: FastifyRequest<{ Body: AccountRequestBody & AccountData }>, res: FastifyReply) {
    const { sessionId, serverUrl, account } = req.body;
    const context = { sessionId, serverUrl };
    const accountData = { 
        Name: account.Name,
        BillingStreet: account.BillingStreet,
        BillingCity: account.BillingCity,
        BillingState: account.BillingState,
        BillingPostalCode: account.BillingPostalCode,
        Website: account.Website
    };

    try {
        const newAccount = await create(context, accountData);
        return res.send(newAccount);
    } catch (err) {
        return res.status(500).send({ err: 'Failed to create account' });
    }
}

export async function updateAccount(req: FastifyRequest<{ Body: AccountRequestBody & AccountData, Params: ParamsWithId }>, res: FastifyReply) {
    const { sessionId, serverUrl, account } = req.body;
    const { id } = req.params;
    const context = { sessionId, serverUrl };
    const accountData = { Name: account.Name,
        BillingStreet: account.BillingStreet,
        BillingCity: account.BillingCity,
        BillingState: account.BillingState,
        BillingPostalCode: account.BillingPostalCode,
        Website: account.Website };

    try {
        const updatedAccount = await update(context, accountData, id);
        return res.send(updatedAccount);
    } catch (error) {
        return res.status(500).send({ error: 'Failed to update account' });
    }
}

export async function deleteAccount(req: FastifyRequest<{ Body: AccountRequestBody, Params: ParamsWithId }>, res: FastifyReply) {
    const { sessionId, serverUrl } = req.body;
    const { id } = req.params;
    const context = { sessionId, serverUrl };

    try {
        const deletedAccount = await del(context, id);
        return res.send({ success: true, statusCode: deletedAccount });
    } catch (err) {
        return res.status(500).send({ err: 'Failed to delete account' });
    }
}
