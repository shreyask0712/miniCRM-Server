import { listOpportunities } from "../controllers/opportunityController"; 
import { FastifyInstance } from "fastify";

export async function opportunityRoutes(fastify:FastifyInstance) {
    fastify.post('/opportunities', listOpportunities)
}