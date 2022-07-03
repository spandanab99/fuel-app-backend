const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const funcs = require("../utils/funcs");

var users = {};

router.post("/register", async (req, res) => {
    try {
        var { email, password } = req.body;
        user = users[email];
        if (user)
            return funcs.sendError(res, 406, "User account already exists with this Email");

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        users[email]={email:email,password:password}
        console.log(user);
        res.status(200).json({
            message: "Registered Sucessfully",
        });
    }

    catch (err) {
        console.log(err);
        funcs.sendError(res, 500, "Something went wrong");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email, password))
            return funcs.sendError(res, 406, "Missing some required fields");
        user = users[email];
        if (!user)
            return funcs.sendError(res, 404, "User with this email not exists");
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            return res.status(200).json({
                message: "Logged in Sucessfully",
                token: 'jwt_token'
            });
        }
        res.status(401).json({
            message: "Authentication failed",
        });


    }
    catch (err) {
        console.log(err);
        funcs.sendError(res, 500, "Something went wrong");
    }
});

module.exports = router;