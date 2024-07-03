const { Schema, models, model } = require("mongoose");

const ReviewSchema = new Schema({
    product : {type:String , required: true},
    useremail : {type:String , required: true},
    userimg : {type:String , required: true},
    username : {type:String , required: true},
    preview : {type:String, required: true},
    pstars :{type:Number, required: true, default:1},
})

export const Review = models.Review || model('Review', ReviewSchema);