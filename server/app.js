require('dotenv').config({});
const express = require('express');
const app = express();


app.listen(process.env.SERVER_PORT,()=>{
    console.log(`App is listening ${process.env.SERVER_PORT} Port`);
})
