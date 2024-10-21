import { FastifyInstance } from "fastify";
import { listContacts, createContacts, updateContacts, deleteContacts } from "../controllers/contactController";

export default async function contactRoutes(fastify: FastifyInstance) {
    fastify.post('/list', listContacts);
    fastify.post('/create', createContacts);
    fastify.post('/update', updateContacts);
    fastify.post('/delete', deleteContacts);
}