import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./pedidodetalle.css";

const PedidoDetalle = () => {

    const { state } = useLocation();
    const orderId = state?.orderId;

    const [order, setOrder] = useState(null);

    const getBadgeColor = (estado) => {
        if (estado === "Pendiente") return "bg-warning text-dark";
        if (estado === "Enviado") return "bg-primary";
        if (estado === "Entregado") return "bg-success";
        return "bg-secondary";
    };

    useEffect(() => {

        if (!orderId) return;

        fetch(`http://localhost:5000/api/orders/${orderId}`)
            .then(res => res.json())
            .then(data => {
                console.log("ORDER DETALLE:", data);
                setOrder(data);
            })
            .catch(err => console.log(err));

    }, [orderId]);

    if (!order) {
        return (
            <div className="pedido-detalle-wrapper">
                <h2 className="text-center mt-4">Cargando pedido...</h2>
            </div>
        );
    }

    return (
        <div className="pedido-detalle-wrapper">
            <div className="pedido-detalle-container">

                <h2 className="pedido-detalle-title">Orden #{order.orderNumber}</h2>

                <div className="pedido-info-card">
                    <p>
                        <strong>Estado:</strong>
                        <span className={`badge pedido-status-badge ${getBadgeColor(order.estado)}`}>
                            {order.estado}
                        </span>
                    </p>
                </div>

                <div className="pedido-productos-section">
                    <h4>Productos del pedido</h4>
                    <div className="pedido-info-card p-0">
                        {order.productos.map((prod, i) => (
                            <div key={i} className="pedido-producto-row">
                                <span>{prod.nombre}</span>
                                <span className="fw-bold">{prod.quantity} x ${prod.precio}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pedido-total-section">
                    Total pagado: ${order.total}
                </div>

                <div className="pedido-btn-group">
                    <Link to="/mispedidos" className="pedido-btn-back">
                        Atrás
                    </Link>

                    <Link to="/" className="pedido-btn-shop">
                        Volver a la tienda
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PedidoDetalle;