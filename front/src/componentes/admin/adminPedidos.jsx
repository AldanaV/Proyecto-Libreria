import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./adminpedidos.css";

const AdminPedidos = () => {
    const [orders, setOrders] = useState([]);

    const getColor = (estado) => {
        if (estado === "Pendiente") return "bg-warning text-dark";
        if (estado === "Enviado") return "bg-primary";
        if (estado === "Entregado") return "bg-success";
        return "bg-secondary";
    };

    const fetchOrders = () => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/api/orders/admin/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    console.log("Error back:", data);
                    setOrders([]);
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="admin-pedidos-wrapper">
            <div className="admin-pedidos-container">
                <h2 className="admin-pedidos-title">Panel de pedidos</h2>
                {orders.length === 0 && <p className="text-center">No hay pedidos.</p>}
                {orders.map(order => (
                    <div key={order._id} className="card order-card p-4 mb-4">
                        <div className="order-card-header">
                            <h5>Pedido #{order.orderNumber}</h5>
                            <span className={`badge order-badge ${getColor(order.estado)}`}>
                                {order.estado}
                            </span>
                        </div>

                        <p className="order-info-p">
                            <strong>Cliente:</strong> {order.cliente?.nombre || order.user?.nombre}
                        </p>

                        <p className="order-info-p">
                            <strong>Fecha:</strong>{" "}
                            {order.fecha
                                ? new Date(order.fecha).toLocaleString("es-AR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })
                                : "Sin fecha"}
                        </p>

                        <p className="order-total">
                            Total: ${order.total}
                        </p>

                        <Link
                            to="/admin/pedido"
                            state={{ orderId: order._id }}
                            className="btn btn-outline-dark btn-detalle">
                            Ver detalle
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPedidos;