const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use("/",require("./routes/login"));

app.listen(PORT,(error)=>{
    console.log(`Listening at port ${PORT}`);
})