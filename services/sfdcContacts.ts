import {Context, query} from './sfdcService';

export async function listContacts(context: Context) {
    return await query(context, 'SELECT id, FirstName, LastName, Email, AccountId from Contacts');
}

export async function createContacts(context: Context, contactData: any) {
    return await query(context, `INSERT INTO Contacts (FirstName, LastName, Email)  VALUES ('${contactData.FirstName}','${contactData.LastName}', '${contactData.Email}')`);
}

export async function updateContacts(context: Context, contactData: any, contactId: string) {
    return await query(context, `UPDATE Contacts SET
            FirstName = '${contactData.FirstName}',
            LastName = '${contactData.LastName}',
            Email = '${contactData.Email}',
            WHERE Id = '${contactId}'
        `);
}

export async function deleteContacts(context: Context, contactId: string) {
    return await query(context, `DELETE FROM Contacts WHERE Id = '${contactId}'`);
}