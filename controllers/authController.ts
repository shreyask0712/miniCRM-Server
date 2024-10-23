import { Client, Pool } from "pg";
import { FastifyRequest, FastifyReply } from "fastify";
import * as soap from "soap";
import bcrypt from "bcrypt";  
import { config } from "dotenv";
config();


const pool = new Pool({
    connectionString: process.env.DB
});

interface authReqBody {
    username: string;
    password: string;
}

export async function login(req: FastifyRequest<{ Body: authReqBody }>, res: FastifyReply) {
    const { username, password } = req.body;


    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).send({ error: 'Username and password must be strings' });
    }

    const userQuery = 'SELECT * from users WHERE username = $1';

    const client = await pool.connect();
    try {
        const userResult = await client.query(userQuery, [username]);

        if (userResult.rowCount === 0) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const user = userResult.rows[0];
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }


        const wsdlUrl = 'C:\\Users\\shrey\\Documents\\GitHub\\miniCRM-Server\\services\\salesforce-partner.wsdl.xml';
        const soapClient = await soap.createClientAsync(wsdlUrl);

        /*console.log("Logging credentials:", {
            username: process.env.SALESFORCE_USERNAME,
            password: `${process.env.SALESFORCE_PASSWORD}${process.env.SALESFORCE_TOKEN}`
        });*/

        const loginResult = await soapClient.loginAsync({
            username: process.env.SALESFORCE_USERNAME,
            password: `${process.env.SALESFORCE_PASSWORD}${process.env.SALESFORCE_TOKEN}`
        });

        const result = loginResult[0]?.result;

        if (!result) {
            return res.status(500).send({ error: 'Login result is undefined' });
        }

        const sessionId = result.sessionId;
        const serverUrl = result.serverUrl;

        if (!sessionId || !serverUrl) {
            return res.status(500).send({ error: 'Session ID or server URL not returned from login' });
        }

        return res.send({ sessionId, serverUrl, username});
        
    } finally {
        client.release();
    }
}

export async function register(req: FastifyRequest<{ Body: authReqBody }>, res: FastifyReply) {
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).send({ error: 'Username and password must be strings' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';

    const client = await pool.connect();
    try {
        await client.query(insertQuery, [username, hashedPassword]);
        return res.send({ message: 'User registered successfully' });
    } finally {
        client.release();
    }
}
