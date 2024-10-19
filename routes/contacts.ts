import { FastifyInstance } from "fastify";
import { listContacts } from "../controllers/contactController";

export default async function contactRoutes(fastify: FastifyInstance) {
    fastify.post('/contacts', listContacts);
}