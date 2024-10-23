import { Context,createRecord,deleteRecord,query, updateRecord } from './sfdcService';

export async function listAccounts(context: Context) {
    return await query(context, 'SELECT Id, Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, Website FROM Account');
}

export async function createAccounts(context: Context, accountData: any) {
    return await createRecord(context, 'Account', accountData);
}

export async function updateAccounts(context: Context, accountData: any, accountId: string) {
    return await updateRecord(context, 'Account', accountData, accountId);
}

export async function deleteAccounts(context: Context, accountId: string) {
    return await deleteRecord(context, accountId, 'Account');
}