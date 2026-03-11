import Order from "../models/Order.js";

export const createOrder = async (req, res) => {

    try{
        const order = new Order({
            orderNumber: Math.floor(100000 + Math.random() * 900000),
            user: req.body.user,
            productos: req.body.productos,
            total: req.body.total,
            direccion: req.body.direccion
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    }catch(error){

        res.status(500).json({msg:"Error al guardar orden"});
    }
};