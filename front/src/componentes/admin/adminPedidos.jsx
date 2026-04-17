import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const AdminPedidos = () =>{
    const [orders, setOrders] = useState([]);

    const getColor = (estado) =>{
        if(estado === "Pendiente") return "bg-warning";
        if(estado === "Enviado") return "bg-primary";
        if(estado === "Entregado") return "bg-success";
        return "bg-secondary";
    };

    const fetchOrders = () => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/api/orders/admin/orders",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(Array.isArray(data)){
                setOrders(data);
            }else{
                console.log("Error back:", data);
                setOrders([]);
            }
        })
        .catch(err => console.log(err));
    };

    useEffect(() =>{
        fetchOrders();
    }, []);

    return(
        <div className="container mt-4">
            <h2>Panel de pedidos</h2>
            {orders.length === 0 && <p>No hay pedidos.</p>}
            {orders.map(order => (
                <div key={order._id} className="card p-3 mb-3">
                    <h5>Order #{order.orderNumber}</h5>

                    <p>Cliente: {order.cliente?.nombre || order.user?.nombre}</p>

                    <p>Fecha de compra:{" "}
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

                    <p>Estado: 
                        <span className={`badge ms-2 ${getColor(order.estado)}`}>
                            {order.estado}
                        </span>
                    </p>
                    <p>Total: ${order.total}</p>

                    <Link 
                        to="/admin/pedido"
                        state={{orderId: order._id}}
                        className="btn btn-outline-dark mt-3">
                        Ver detalle
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AdminPedidos;