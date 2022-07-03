const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helper = require('./helper');
const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan("combined"));

app.use("/",require("./routes/auth"));
app.use('/profile', helper.verifyJWT, require('./routes/profile'))


app.use((req, res) => {
	throw { err_message: "Route not found!", err_code: 404 };
});

app.use((err, req, res, next) => {
	if (err instanceof SyntaxError) return helper.sendError(res, "JSON parse error!", 400);
	else return helper.sendError(res, err.err_message || err, err.err_code);
});

const server = app.listen(PORT,(error)=>{
    console.log(`Listening at port ${PORT}`);
})

module.exports = { app, server };
