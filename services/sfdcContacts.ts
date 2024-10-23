import {Context, createRecord, deleteRecord, query, updateRecord} from './sfdcService';

export async function listContacts(context: Context) {
    return await query(context, 'SELECT id, FirstName, LastName, Email, AccountId from Contacts');
}

export async function createContacts(context: Context, contactData: any) {
    return await createRecord(context, 'Contact',contactData);
}

export async function updateContacts(context: Context, contactData: any, contactId: string) {
    return await updateRecord(context, 'Contact', contactData, contactId);
}

export async function deleteContacts(context: Context, contactId: string) {
    return await deleteRecord(context, contactId, 'Contact');
}