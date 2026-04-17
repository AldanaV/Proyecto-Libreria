import Order from "../models/Order.js";

export const createOrder = async (req, res) => {

    try{
        if(!req.body.productos || 
            req.body.productos.length === 0 ||
            !req.body.total || 
            req.body.total <= 0 ||
            !req.body.direccion
        ){
            return res.status(400).json({ msg: "Datos incompletos en la orden" });
        }
        
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
        .populate("user", "nombre email")
        .sort({fecha: -1});
        res.json(orders);
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Error al obtener pedidos."});
    }
};

export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find()
        .populate("user", "nombre email")
        .sort({fecha: -1});

        res.json(orders);
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Error al obtener pedidos"});
    }
};

export const updateOrderStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const {estado} = req.body;

        const estadosValidos = ["Pendiente", "Enviado", "Entregado"];
        
        if(!estadosValidos.includes(estado)){
            return res.status(400).json({msg: "Estado inválido."});
        }

        const order = await Order.findByIdAndUpdate(
            id,
            {estado},
            {new: true}
        );

        if(!order){
            return res.status(404).json({msg: "Orden no encontrada."});
        }

        res.json(order);
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "Error al visualizar estado."});
    }
};

export const getOrderById = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({msg: "Pedido no encontrado."});
        }
        res.json(order);
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "Error al obtener pedido."});
    }
};