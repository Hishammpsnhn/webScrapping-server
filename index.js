import express from "express";
import dotenv from "dotenv";
import url from './Routes/urlRoutes.js'
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/url', url);

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    UseUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`server runnig on port : ${PORT}`)))
.catch((err)=> console.log(err.message) )