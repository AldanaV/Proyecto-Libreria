import Book from "../models/Book.js"

export const getBooks = async (req, res) => {
    try{
        const libros = await Book.find();
        res.json(libros);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


export const createBook = async (req, res) => {
    try{
        const nuevoLibro = new Book(req.body);
        const guardado = await nuevoLibro.save();

        res.status(201).json(guardado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


export const updateBook = async (req, res) => {
    try{
        const {id} = req.params;

        const actualizado = await Book.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );

        res.json(actualizado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


export const deleteBook = async(req, res) => {
    try{
        const {id} = req.params;
        await Book.findByIdAndDelete(id);
        res.json({message: "Libro eliminado"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

export const getTopBooks = async (req, res) => {
    try {
        const libros = await Book.find().sort({ ventas: -1 }).limit(6);
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};