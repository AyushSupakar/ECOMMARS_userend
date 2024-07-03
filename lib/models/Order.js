const { Schema, models, model } = require("mongoose");

const OrderSchema = new Schema({
    registeredemail : {type:String , required: true},
    username : {type:String , required: true},
    useremail : {type:String , required: true},
    userimg : {type:String , required: true},
    userPhoneNo : {type:String, default:"xxx" },
    userAddress :{type:String, default:"xxx"},
    userCountry :{type:String, default:"xxx"},
    userAddressPin :{type:String, default:"xxx"},
    totprice: {type:Number},
    cartstate: {type : Array, default : []},
    line_items: {type : Array, default : []},
    paid:{type:Boolean, default:false},
    time:{type: Date, default:Date.now}
})

export const Order = models.Order || model('Order', OrderSchema);