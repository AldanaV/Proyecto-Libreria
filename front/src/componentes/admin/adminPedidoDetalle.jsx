import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./adminPedidoDetalle.css";

const AdminPedidoDetalle = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const orderId = location.state?.orderId;

    const [order, setOrder] = useState(null);
    const [estado, setEstado] = useState("");

    const getColor = (estado) => {
        if (estado === "Pendiente") return "bg-warning text-dark";
        if (estado === "Enviado") return "bg-primary";
        if (estado === "Entregado") return "bg-success";
        return "bg-secondary";
    };

    useEffect(() => {

        if (!orderId) return;

        const token = localStorage.getItem("token");

        fetch(`http://localhost:5000/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setEstado(data.estado);
            })
            .catch(err => console.log(err));

    }, [orderId]);

    const handleEstado = async (nuevoEstado) => {

        const token = localStorage.getItem("token");

        try {
            await fetch(`http://localhost:5000/api/orders/admin/orders/${order._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });

            setEstado(nuevoEstado);

        } catch (error) {
            console.log(error);
        }
    };

    if (!order) {
        return (
            <div className="admin-detalle-wrapper">
                <h2 className="text-center mt-4">Cargando pedido...</h2>
            </div>
        )
    }

    return (
        <div className="admin-detalle-wrapper">
            <div className="admin-detalle-container">

                <h2 className="admin-detalle-title">Orden #{order.orderNumber}</h2>

                <div className="admin-info-card">
                    <p><strong>Cliente:</strong> {order.cliente?.nombre || order.user?.nombre}</p>
                    <p><strong>Email:</strong> {order.cliente?.email || order.user?.email}</p>
                    <p><strong>Dirección:</strong> {order.direccion}</p>
                    <p>
                        <strong>Estado actual:</strong>
                        <span className={`badge admin-status-badge ms-2 ${getColor(estado)}`}>
                            {estado}
                        </span>
                    </p>
                    <p><strong>Total Orden:</strong> <span className="fw-bold text-success">${order.total}</span></p>
                </div>

                <div className="admin-productos-section">
                    <h4>Productos en este pedido</h4>
                    <div className="admin-info-card">
                        {order.productos.map((prod, index) => (
                            <div key={index} className="admin-producto-row">
                                <span>{prod.nombre}</span>
                                <span>{prod.quantity} x ${prod.precio}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-buttons-group">
                    <button
                        className="btn btn-warning admin-btn-action"
                        onClick={() => handleEstado("Pendiente")}
                        disabled={estado === "Pendiente"}
                    >
                        Marcar Pendiente
                    </button>

                    <button
                        className="btn btn-primary admin-btn-action"
                        onClick={() => handleEstado("Enviado")}
                        disabled={estado === "Enviado" || estado === "Entregado"}
                    >
                        Marcar Enviado
                    </button>

                    <button
                        className="btn btn-success admin-btn-action"
                        onClick={() => handleEstado("Entregado")}
                        disabled={estado === "Entregado"}
                    >
                        Marcar Entregado
                    </button>
                </div>

                <button
                    className="btn btn-secondary btn-back-full"
                    onClick={() => navigate(-1)}
                >
                    Volver al listado
                </button>

            </div>
        </div>
    );
};

export default AdminPedidoDetalle;