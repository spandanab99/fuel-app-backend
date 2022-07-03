const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');
let { users } = require("users");

const suggestedPrice = 10;

router.get("/list", (req, res, next) => {
    try {
        const user = users[req.email];
        helper.sendSuccess(res, user[quotes]);
    }
    catch (err){
        next(err)
    }
})

router.post("/get", (req, res, next) => {
    try {
        const user = users[req.email];
        const id = req.params.id;
        if (!id)
            throw { err_message: "Provide an Id", err_code: 401 }
            
        if (!(id in user.quotes))
            throw { err_message: "Quote doesnt exist", err_code: 401 }

        helper.sendSuccess(res, user.quotes[id])
    } catch (error) {
        next(error)
    }
})

router.post('/add', (req, res, next) => {
    try {
        const user = users[req.email];
        const id = uuidv4();
        
        let { requestedGallons, deliveryDate } = req.body;
        if (!(gallons && date))
            throw { err_message: "Provide required fields", err_code: 401 }

        // add validations to gallons and date
        deliveryAddress = user.profile.address1
        totalDue = suggestedPrice * gallons

        user.quotes[id] = {
            requestedGallons,
            deliveryAddress,
            deliveryDate,
            suggestedPrice,
            totalDue,
        }

        helper.sendSuccess(res, user.quotes.id)

    } catch (error) {
        next(error)
    }
})

module.exports = router;