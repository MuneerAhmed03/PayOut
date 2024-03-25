const express = require("express");
const rootRouter= require('./routes/index')
const cors=require("cors")

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'https://pay-out.vercel.app/',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use(express.json())
app.use("/api/v1",rootRouter);

app.listen(PORT);

