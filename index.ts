import express from 'express';
import { AdminRoute, VendorRoute } from './src/routes';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv'
import mongoose, { mongo } from 'mongoose';

dotEnv.config();

// Connecting to Database
const URL = process.env.MONGO_URL;
mongoose.connect(URL!, {
    
}).then(res => console.log("Connected To Database")).catch(err => console.log(err));

const app = express();

// Apply Global Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Apply Routes
app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);

app.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Server runing on port ${process.env.PORT}`);    
});