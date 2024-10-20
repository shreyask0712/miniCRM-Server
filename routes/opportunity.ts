import { listOpportunities, createOpportunities, updateOpportunities, deleteOpportunity } from "../controllers/opportunityController"; 
import { FastifyInstance } from "fastify";

export default async function opportunityRoutes(fastify:FastifyInstance) {
    fastify.post('/list', listOpportunities)
    fastify.post('/create', createOpportunities)
    fastify.post('/update/:id', updateOpportunities)
    fastify.post('/delete/:id', deleteOpportunity)
}