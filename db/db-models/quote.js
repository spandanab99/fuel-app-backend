const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "User",
        },
        requestedGallons:{
            type:Number,
            required:[true,'Number of gallons is required'],

        },
        deliveryAddress:{
            type:String,
            required:[true,'Delivery Address is required'],
        },
        deliveryDate:{
            type:Date,
            required:[true,'Delivery date is required'],
        },
        suggestedPrice:{
            type:Number,

        },
        totalDue:{
            type:Number,
        },
    }

);

const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;