const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const helper = require("../helper");
const { users } = require("../users");

router.post("/register", async (req, res, next) => {
    try {
        var { email, password } = req.body;
        user = users[email];
        if (user)
            throw { err_message: "User account already exists with this Email", err_code: 406 };
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        users[email]={email:email,password:password}
        helper.sendSuccess(res,"Registered Successfully");
    }

    catch (err) {
        next(err)
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email, password))
            throw { err_message: "Missing some required fields", err_code: 404 }
        user = users[email];
        if (!user)
            throw { err_message: "User with this email not exists", err_code: 406 };
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            jwt = helper.genJWT({email:email});
            return helper.sendSuccess(res,jwt);
        }
        throw { err_message: "Authentication Failed", err_code: 500};
       
    }
    catch (err) {
        next(err)
    }
});

module.exports = router;