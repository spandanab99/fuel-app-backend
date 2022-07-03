const router = require("express").Router();
let { users } = require("users");

router.get('/', (req, res, next) => {
    try {
        res.json(profile);
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

        if (!zipcode.match(/[0-9]{5-9}/))
            throw { err_message: "Invalid zipcode", err_code: 406}

        users[email] = {
            fullName,
            address1,
            address2,
            city,
            state,
            zipcode
        }

        helper.sendSuccess(res, "Profile added");
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
            if (!zipcode.match(/[0-9]{5-9}/))
                throw { err_message: "Invalid zipcode", err_code: 406 }
            profile.zipcode = zipcode;
        }
    }
    catch (err){
        next(err);
    }
})

module.exports = router;