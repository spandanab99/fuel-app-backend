const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const PORT = 3000;



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/",(req,res)=>{
    res.send("Hello World!!");
})


app.listen(PORT,(error)=>{
    console.log(`Listening at port ${PORT}`);
})