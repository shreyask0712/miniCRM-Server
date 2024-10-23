import { Context, createRecord, deleteRecord, query, updateRecord } from "./sfdcService";

export async function listOpportunities(context: Context) {
    return await query(context,'SELECT id, Name, StageName, Amount, AccountId from Opportunity');
}

export async function createOpportunities(context: Context, opportunityData: any) {
    return await createRecord(context, 'Opportunity', opportunityData);
}

export async function updateOpportunities(context: Context, opportunityData: any, opportunityId: string) {
    return await updateRecord(context, 'Opportunity', opportunityData, opportunityId);
}

export async function deleteOpportunity(context: Context, opportunityId: string) {
    return await deleteRecord(context, opportunityId, 'Opportunity');
}