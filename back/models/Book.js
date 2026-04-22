import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        unique: true
    },

    titulo:{
        type: String,
        required: true
    },

    autor:{
        type: String,
        required: true
    },

    editorial: String,
    categoria: String,

    idioma:{
        type: String,
        default: ""
    },

    precio:{
        type: Number,
        required: true
    },

    stock:{
        type: Number,
        required: true,
        default: 0
    },

    imagen:{
        type: String,
        default: ""
    }
    
});

export default mongoose.model("Book", bookSchema);