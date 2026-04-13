import Order from "../models/Order.js";

export const createOrder = async (req, res) => {

    try{
        const lastOrder = await Order.findOne().sort({ orderNumber: -1});
        const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1001;
        const order = new Order({
            orderNumber: newOrderNumber,

            user: req.body.user,

            cliente:{
                nombre: req.body.nombre,
                email: req.body.email
            },

            productos: req.body.productos,
            total: req.body.total,
            direccion: req.body.direccion
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    }catch(error){
        console.log("ERROR AL CREAR ORDEN.", error);
        res.status(500).json({msg:"Error al guardar orden"});
    }
};

export const getOrderByUser = async (req, res) =>{
    try{
        const orders = await Order.find({user: req.params.id})
        .sort({fecha: -1});
        res.json(orders);
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Error al obtener pedidos."});
    }
};