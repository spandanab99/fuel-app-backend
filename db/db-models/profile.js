const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "User",
        },
        fullName: {
            type:String,
            required: [true, 'Full name is required']
        },
        address1:{
            type:String,
            required: [true, 'Address 1 is required']
        },
        address2:{
            type:String,
        },
        city:{
            type:String,
            required: [true, 'City is required']
        },
        state:{
            type:String,
            required: [true, 'State is required']
        },
        zipcode:{
            type:String,
            validate: {
                validator: function(v) {
                  return /^[0-9]{5}(?:-[0-9]{4})?$/.test(v);
                },
                message: props => `${props.value} is not a valid Zipcode !`
              },
            required: [true, 'Zipcode is required']
        },
        
        
    }

);

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;