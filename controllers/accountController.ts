import { listAccounts as list} from "../services/sfdcAccounts";

export async function listAccounts(req, res) {
    const { sessionId, serverUrl } = req.body;

    const context = {sessionId, serverUrl};
    const accounts = await list(context);

    return res.send(accounts);
}