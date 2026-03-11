import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNumber:{
        type: Number,
        unique: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productos:Array,

    total:Number,

    direccion:String,

    fecha:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model("Order", orderSchema);