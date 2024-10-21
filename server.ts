import fastify from "fastify";
import authRoutes from "./routes/auth";
import accountRoutes from "./routes/accounts";
import contactRoutes from "./routes/contacts";
import opportunityRoutes from "./routes/opportunity";
import dotenv from "dotenv";
import fastifyCors from "@fastify/cors";

dotenv.config();

const app = fastify({logger:true});

app.register(authRoutes, {prefix: '/auth'});
app.register(accountRoutes, {prefix: '/accounts'});
app.register(contactRoutes, {prefix: '/contacts'});
app.register(opportunityRoutes, {prefix: '/opportunity'})
app.register(fastifyCors, {
    origin: '*',
    methods:['GET', 'POST', 'PUT', 'DELETE']
});

const start = async() => {
    try {
        await app.listen({port: 3000});
        console.log(process.env.DB);
        console.log('Server running at http://localhost:3000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();