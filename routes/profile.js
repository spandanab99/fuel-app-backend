const router = require("express").Router();
const helper = require("../helper");
const db = require("../db/db");



router.get('/', async (req, res, next) => {
    try {
        const user = await db.User.findOne({email:req.email});
        const profile = await db.Profile.findOne({user:user._id});
        helper.sendSuccess(res, profile);
    }
    catch (err){
        next(err);
    }
})

/* istanbul ignore next */
router.post('/', async (req, res, next) => {
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

        user = await db.User.findOne({email:email});
        profile = await db.Profile.create({
            user:user._id,
            fullName,
            address1,
            address2,
            city,
            state,
            zipcode,
        });
        
        helper.sendSuccess(res, profile);
    }
    catch (err){
        next(err);
    }
})

/* istanbul ignore next */
router.patch('/', async (req, res, next) => {
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
        let profile = {};

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
        user = await db.User.findOne({email:email});
        await db.Profile.findOneAndUpdate({user:user._id},profile);
        profile = await db.Profile.findOne({user:user._id})
       
        helper.sendSuccess(res, profile)
    }
    catch (err){
        next(err);
    }
})

module.exports = router;