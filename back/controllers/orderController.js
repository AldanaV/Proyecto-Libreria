import Order from "../models/Order.js";
import Book from "../models/Book.js";

// 🔥 CREAR ORDEN
export const createOrder = async (req, res) => {
    try {
        const { productos, total, direccion, user, nombre, email } = req.body;

        // 🧪 VALIDACIONES
        if (!productos || productos.length === 0) {
            return res.status(400).json({ msg: "No hay productos en la orden" });
        }

        if (!total || total <= 0) {
            return res.status(400).json({ msg: "Total inválido" });
        }

        if (!direccion) {
            return res.status(400).json({ msg: "Dirección requerida" });
        }

        // 🔍 DEBUG (podés borrarlo después)
        console.log("Productos recibidos:", productos);

        // 🔥 VALIDAR Y DESCONTAR STOCK
        for (const item of productos) {
            
            const libroId = item.libroId || item._id || item.id || item.isbn;

            // ⚠️ si no viene libroId, no rompe todo
            if (!libroId) {
                console.log("Producto sin libroId:", item);
                continue;
            }

            // Validar si libroId es un ObjectId válido de Mongoose
            const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(libroId);
            
            let libro;
            if (isValidObjectId) {
                libro = await Book.findById(libroId);
            } else {
                libro = await Book.findOne({ isbn: String(libroId) });
            }

            if (!libro) {
                console.log("Libro no encontrado:", libroId);
                continue;
            }

            const cantidad = item.cantidad || item.quantity || 1;

            // 🚫 SIN STOCK
            if (libro.stock < cantidad) {
                return res.status(400).json({
                    msg: `Stock insuficiente para ${libro.titulo}`
                });
            }

            // 📉 DESCONTAR STOCK
            libro.stock -= cantidad;

            // 📊 CONTAR VENTAS (para más vendidos)
            libro.ventas = (libro.ventas || 0) + cantidad;

            await libro.save();
        }

        // 🔢 GENERAR NÚMERO DE ORDEN
        const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
        const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1001;

        // 📦 CREAR ORDEN
        const order = new Order({
            orderNumber: newOrderNumber,
            user: user,
            cliente: {
                nombre: nombre,
                email: email
            },
            productos: productos,
            total: total,
            direccion: direccion
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    } catch (error) {
        console.log("ERROR AL CREAR ORDEN:", error);
        res.status(500).json({ msg: "Error al guardar orden" });
    }
};

// 📦 ÓRDENES DE UN USUARIO
export const getOrderByUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.id })
            .populate("user", "nombre email")
            .sort({ fecha: -1 });

        res.json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener pedidos." });
    }
};

// 📦 TODAS LAS ÓRDENES
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "nombre email")
            .sort({ fecha: -1 });

        res.json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener pedidos" });
    }
};

// 🔄 ACTUALIZAR ESTADO
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const estadosValidos = ["Pendiente", "Enviado", "Entregado"];

        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ msg: "Estado inválido." });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ msg: "Orden no encontrada." });
        }

        res.json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar estado." });
    }
};

// 🔍 OBTENER ORDEN POR ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: "Pedido no encontrado." });
        }

        res.json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener pedido." });
    }
};