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

    cliente:{
        nombre: String,
        email: String
    },

    productos:Array,
    total:Number,
    direccion:String,

    estado:{
        type: String,
        default: "Pendiente"
    },

    fecha:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model("Order", orderSchema);