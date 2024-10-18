import fastify from "fastify";
import authRoutes from "./routes/auth";
import accountRoutes from "./routes/accounts";
import dotenv from "dotenv";

dotenv.config();

const app = fastify({logger:true});

app.register(authRoutes, {prefix: '/auth'});
app.register(accountRoutes, {prefix: '/accounts'});

const start = async() => {
    try {
        await app.listen({port: 3000});
        console.log('Server running at https://localhost:3000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();