const { Schema, models, model } = require("mongoose");

const CartSchema = new Schema(
    {
        useremail: {type:String},
        cartstate: {type : Array, default : []},

    })

export const Cart = models?.Cart || model('Cart',CartSchema);