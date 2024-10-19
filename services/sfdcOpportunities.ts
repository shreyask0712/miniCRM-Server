import { Context, query } from "./sfdcService";

export async function listOpportunities(context: Context) {
    return await query(context,'SELECT id, Name, StageName, Amount, AccountId from Opportunity');
}

export async function createOpportunities(context: Context, opportunityData: any) {
    return await query(context, `INSERT INTO Opportunity (Name, StageName, Amount, AccountId)
            VALUES (
                '${opportunityData.Name}',
                '${opportunityData.StageName}',
                '${opportunityData.Amount}',
                '${opportunityData.AccountId}'
            ) RETURNING *
        `);
}

export async function updateOpportunities(context: Context, opportunityData: any, opportunityId: string) {
    return await query(context, `UPDATE Opportunity SET
            Name = '${opportunityData.Name}',
            StageName = '${opportunityData.StageName}',
            Amount = '${opportunityData.Amount}',
            AccountId = '${opportunityData.accountId}'
            WHERE Id = '${opportunityId}' RETURNING *
        `);
}

export async function deleteOpportunity(context: Context, opportunityId: string) {
    return await query(context, `DELETE FROM Opportunity WHERE Id = '${opportunityId}' RETURNING *`)
}