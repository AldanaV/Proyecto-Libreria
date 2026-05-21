import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./mispedidos.css";

const MisPedidos = () => {
    const [orders, setOrders] = useState([]);

    const getBadgeColor = (estado) => {
        if (estado === "Pendiente") return "bg-warning text-dark";
        if (estado === "Enviado") return "bg-primary";
        if (estado === "Entregado") return "bg-success";
        return "bg-secondary";
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            console.log("No hay usuario logueado.")
            return;
        }

        fetch(`http://localhost:5000/api/orders/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                console.log("ORDERS:", data);
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                }
            })
            .catch(err => console.log(err));

    }, []);

    return (
        <div className="mis-pedidos-wrapper">
            <div className="mis-pedidos-container">
                <h2 className="mis-pedidos-title">Mis pedidos</h2>
                {orders.length === 0 && <p className="text-center">Todavía no tenes ningún pedido.</p>}
                {orders.map(order => (
                    <div key={order._id} className="user-order-card">
                        <h5>Orden #{order.orderNumber}</h5>

                        <p className="user-order-info">
                            <strong>Estado:</strong>
                            <span className={`badge user-order-badge ${getBadgeColor(order.estado)}`}>
                                {order.estado}
                            </span>
                        </p>

                        <p className="user-order-total">
                            Total: ${order.total}
                        </p>

                        <Link
                            to="/pedido"
                            state={{ orderId: order._id }}
                            className="btn btn-outline-dark btn-ver-detalle"
                        >
                            Ver detalle
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default MisPedidos;