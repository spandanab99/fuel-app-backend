const router = require("express").Router();
const helper = require("../helper");
let { users } = require("../users");

router.get('/', (req, res, next) => {
    const user = users[req.email];
    try {
        helper.sendSuccess(res, user)
    }
    catch (err){
        next(err);
    }
})

router.post('/', (req, res, next) => {
    try {
 
        const email = req.email;
        let {   
            fullName,
            address1,
            address2,
            city,
            state,
            zipcode
        } = req.body;

        if (!(fullName && address1 && city && state && zipcode))
            throw { err_message: "Provide required fields", err_code: 406 }

        if (!(zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)))
            throw { err_message: "Invalid zipcode", err_code: 406}

        users[email] = {
            ...users[email],
            fullName,
            address1,
            address2,
            city,
            state,
            zipcode,
        }

        helper.sendSuccess(res, users[email]);
    }
    catch (err){
        next(err);
    }
})

router.patch('/', (req, res, next) => {
    try {
        
        const email = req.email;
        let {
            fullName,
            address1,
            address2,
            city,
            state,
            zipcode
        } = req.body;
        let profile = users[email];

        if (fullName)
            profile.fullName = fullName;
        if (address1)
            profile.address1 = address1;
        if (address2)
            profile.address2 = address2;
        if (city)
            profile.city = city;
        if (state)
            profile.state = state;
        if (zipcode){
            if (!zipcode.match(/^[0-9]{5}$/))
                throw { err_message: "Invalid zipcode", err_code: 406 }
            profile.zipcode = zipcode;
        }
        helper.sendSuccess(res, profile)
    }
    catch (err){
        next(err);
    }
})

module.exports = router;