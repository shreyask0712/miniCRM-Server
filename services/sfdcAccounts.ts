import { Context,query } from './sfdcService';

export async function listAccounts(context: Context) {
    return await query(context, 'SELECT Id, Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, Website FROM Accounts');
}