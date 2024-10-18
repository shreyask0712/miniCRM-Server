import { FastifyInstance } from 'fastify';
import {listAccounts} from "../controllers/accountController"

export default async function accountRoutes(fastify: FastifyInstance) {
    
    fastify.post('/accounts', listAccounts);
}

