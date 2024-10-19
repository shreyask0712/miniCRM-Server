import { Context, query } from "./sfdcService";

export async function listOpportunities(context: Context) {
    return await query(context,'SELECT id, Name, StageName, Amount, AccountId from Opportunities');
}