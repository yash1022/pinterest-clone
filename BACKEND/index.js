import express, { urlencoded } from 'express';
import { connect } from './DATABASE/connection.database.js';
import dotenv from 'dotenv';
import {router} from './ROUTES/auth.routes.js'
import { router2 } from './ROUTES/features.routes.js';
import path from "path";
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app =express();
dotenv.config()



app.use(express.json());
app.use(urlencoded())
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:5173',
    credentials:true}));
connect();





app.use('/auth', router);
app.use('/features',router2);


app.listen(process.env.PORT,()=>{
    console.log(`CONNECTED TO SERVER ${process.env.PORT}`);
})
