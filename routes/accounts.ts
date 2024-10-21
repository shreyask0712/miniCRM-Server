import { FastifyInstance } from 'fastify';
import {listAccounts, createAccount, updateAccount, deleteAccount} from "../controllers/accountController"

export default async function accountRoutes(fastify: FastifyInstance) {
    fastify.post('/list', listAccounts);
    fastify.post('/create', createAccount);
    fastify.post('/update', updateAccount);
    fastify.post('/delete', deleteAccount);
}

