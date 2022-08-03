
const router = require("express").Router();
const helper = require("../helper");
const db = require("../db/db");
const pricingModule = require("../calculate_price");



router.get("/history", async (req, res, next) => {
    try {
        const user = await db.User.findOne({email:req.email});
        quotes = await db.Quote.find({user:user._id});
        helper.sendSuccess(res, quotes);
    }
    catch (err){
        next(err)
    }
})

/* istanbul ignore next */
router.get("/", async (req, res, next) => {
    try {
        const id = req.query.id;
        if (!id)
            throw { err_message: "Provide an Id", err_code: 401 }

        quote = await db.Quote.findOne({_id:id});
        if (!(quote))
            throw { err_message: "Quote doesnt exist", err_code: 401 }
        helper.sendSuccess(res, quote)
    } catch (error) {
        next(error)
    }
})


/* istanbul ignore next */
router.post('/', async (req, res, next) => {
    try {

        let { requestedGallons, deliveryDate } = req.body;
        if (!(requestedGallons && deliveryDate))
            throw { err_message: "Provide required fields", err_code: 401 }

        if (typeof requestedGallons !== 'number')
            throw { err_message: "Invalid requested gallons", err_code: 401 }

        const user = await db.User.findOne({email:req.email});
        const profile = await db.Profile.findOne({user:user._id});
        deliveryAddress = profile.address1;
        if(!profile.state)
            throw { err_message: "Please update your state in Profile page", err_code: 401 }
        const totalQuotes = await db.Quote.find({user:user._id}).countDocuments(); 
        const {suggestedPrice,totalDue}= pricingModule.calculatePrice(Number(requestedGallons),profile.state,totalQuotes);


        quote = await db.Quote.create({
            user:user._id,
            requestedGallons,
            deliveryAddress,
            deliveryDate,
            suggestedPrice,
            totalDue,
        });
        helper.sendSuccess(res, quote)

    } catch (error) {
        next(error)
    }
})


router.post('/get-quote',async (req,res,next)=>{
    try{
        const { requestedGallons } = req.body;
        if(!requestedGallons)
            throw { err_message: "Provide required fields", err_code: 401 }
        const user = await db.User.findOne({email:req.email});
        const profile = await db.Profile.findOne({user:user._id});
        if(!profile.state)
            throw { err_message: "Please update your state in Profile page", err_code: 401 }
        const totalQuotes = await db.Quote.find({user:user._id}).countDocuments();

        const data= pricingModule.calculatePrice(requestedGallons,profile.state,totalQuotes);
        helper.sendSuccess(res,data);
    }
    catch(err){
        next(err);
    }

})

module.exports = router;