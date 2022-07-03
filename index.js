const express = require("express");
const bodyParser = require('body-parser');
const helper = require('helper');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/profile', helper.verify, require('routes/profile'))

app.get("/",(req,res)=>{
    res.send("Hello World!!");
})

app.use((req, res) => {
	throw { err_message: "Route not found!", err_code: 404 };
});

app.use((err, req, res, next) => {
	if (err instanceof SyntaxError) return helper.sendError(res, "JSON parse error!", 400);
	else return helper.sendError(res, err.err_message || err, err.err_code);
});

app.listen(PORT,(error)=>{
    console.log(`Listening at port ${PORT}`);
})

