import { Context,query } from './sfdcService';

export async function listAccounts(context: Context) {
    return await query(context, 'SELECT Id, Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, Website FROM Accounts');
}

export async function createAccounts(context: Context, accountData: any) {
    return await query(context, `INSERT INTO Accounts (Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, Website)
         VALUES (
            '${accountData.Name}',
            '${accountData.BillingStreet}',
            '${accountData.BillingCity}',
            '${accountData.BillingState}',
            '${accountData.BillingPostalCode}',
            '${accountData.Website}')
         `);
}

export async function updateAccounts(context: Context, accountData: any, accountId: string) {
    return await query(context, `UPDATE Accounts SET
            Name = '${accountData.Name}',
            BillingStreet = '${accountData.BillingStreet}',
            BillingCity = '${accountData.BillingCity}', 
            BillingState = '${accountData.BillingState}', 
            BillingPostalCode = '${accountData.BillingPostalCode}', 
            Website = '${accountData.Website}'
            WHERE Id = '${accountId}'
        `);
}

export async function deleteAccounts(context: Context, accountId: string) {
    return await query(context, `DELETE FROM Accounts WHERE Id = '${accountId}'`);
}