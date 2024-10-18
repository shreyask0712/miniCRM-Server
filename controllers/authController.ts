import { Client, Pool } from "pg";
import soap from "soap";
import {config} from "dotenv";
config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export async function login(req, res) {
    const { username, password } = req.body;
    const userQuery = 'SELECT * from users WHERE username = $1 AND password = $2';

    const client = await pool.connect();
    const userResult = await client.query(userQuery, [username, password]);

    if (userResult.rowCount===0) {
        return res.status(401).send({error:'Invalid credentials'});
    }

    const wsdlUrl = './salesforce-partner.wsdl.xml';
    const soapClient = await soap.createClientAsync(wsdlUrl);

    const loginResult = await soapClient.loginAsync({
        username: process.env.SALESFORCE_USERNAME,
        password: `${process.env.SALESFORCE_PASSWORD}${process.env.SALESFORCE_TOKEN}`
    })

    const sessionId = loginResult.sessionId;
    const serverUrl = loginResult.serverUrl;

    return res.send({sessionId, serverUrl});
}

export async function register (req, res) {
    const { username, password } = req.body;
    const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';

    const client = await pool.connect();

    await client.query(insertQuery, [username, password]);

    return res.send({message: 'User registered succesfully'});
}