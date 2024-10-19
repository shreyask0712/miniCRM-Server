import {Context, query} from './sfdcService';

export async function listContacts(context: Context) {
    return await query(context, 'SELECT id, FirstName, LastName, Email, AccountId from Contacts');
}