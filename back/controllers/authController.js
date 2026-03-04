import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try{
        const {nombre, email, password} = req.body;

        const userExists = await User.findOne({email});
        if (userExists){
            return res.status(400).json({msg: "El usuario ya existe."});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            nombre,
            email,
            password: hashedPassword
        });

        res.status(201).json({msg: "Usuario creado correctamente"});
    } catch (error){
        res.status(500).json({msg: "Error del servidor."});
    }
};

export const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "Usuario no encontrado."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Contraseña incorrecta."});
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.json({
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email
            }
        });
    } catch(error){
        res.status(500).json({msg: "Error del servidor."});
    }
};