const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const helper = require("../helper");
let { users } = require("../users");

const suggestedPrice = 10;

router.get("/history", (req, res, next) => {
    try {
        const user = users[req.email];
        helper.sendSuccess(res, user.quotes);
    }
    catch (err){
        next(err)
    }
})

router.get("/", (req, res, next) => {
    try {
        const user = users[req.email];
        const id = req.query.id;
        if (!id)
            throw { err_message: "Provide an Id", err_code: 401 }
            
        if (!(id in user.quotes))
            throw { err_message: "Quote doesnt exist", err_code: 401 }

        helper.sendSuccess(res, user.quotes[id])
    } catch (error) {
        next(error)
    }
})

router.post('/', (req, res, next) => {
    try {
        const user = users[req.email];
        const id = uuidv4();
        
        let { requestedGallons, deliveryDate } = req.body;
        if (!(requestedGallons && deliveryDate))
            throw { err_message: "Provide required fields", err_code: 401 }

        // add validations to gallons and date
        deliveryAddress = user.address1
        totalDue = suggestedPrice * requestedGallons;

        user.quotes = {}
        user.quotes[id] = {
            id,
            requestedGallons,
            deliveryAddress,
            deliveryDate,
            suggestedPrice,
            totalDue,
        }

        helper.sendSuccess(res, user.quotes[id])

    } catch (error) {
        next(error)
    }
})

module.exports = router;