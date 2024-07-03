const { Schema, models, model } = require("mongoose");

const UserDetailsSchema = new Schema({
    username : {type:String , required: true},
    useremail : {type:String , required: true},
    userimg : {type:String , required: true},
    userPhoneNo : {type:String, default:"xxx" },
    userAddress :{type:String, default:"xxx"},
    userAddress :{type:String, default:"xxx"},
    userAddressPin :{type:String, default:"xxx"},
})

export const UserDetails = models.UserDetails || model('UserDetails', UserDetailsSchema);