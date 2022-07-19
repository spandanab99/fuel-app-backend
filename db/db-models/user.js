const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                  return /.+\@.+\..+/.test(v);
                },
                message: props => `${props.value} is not a valid Email !`
            },
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
    }

);

const User = mongoose.model("User", UserSchema);
module.exports = User;