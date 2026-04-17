import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminPedidoDetalle = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const orderId = location.state?.orderId;

    const [order, setOrder] = useState(null);
    const [estado, setEstado] = useState("");

    const getColor = (estado) => {
        if(estado === "Pendiente") return "bg-warning";
        if(estado === "Enviado") return "bg-primary";
        if(estado === "Entregado") return "bg-success";
        return "bg-secondary";
    };

    useEffect(() => {

        if(!orderId) return;

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

        try{
            await fetch(`http://localhost:5000/api/orders/admin/orders/${order._id}`, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });

            setEstado(nuevoEstado);

        }catch(error){
            console.log(error);
        }
    };

    if(!order){
        return <h2 className="text-center mt-4">Cargando pedido...</h2>
    }

    return(
        <div className="container mt-4">

            <h2>Orden #{order.orderNumber}</h2>

            <p><strong>Cliente:</strong> {order.cliente?.nombre || order.user?.nombre}</p>
            <p><strong>Email:</strong> {order.cliente?.email || order.user?.email}</p>
            <p><strong>Dirección:</strong> {order.direccion}</p>

            <p>
                <strong>Estado:</strong>
                <span className={`badge ms-2 ${getColor(estado)}`}>
                    {estado}
                </span>
            </p>

            <p><strong>Total:</strong> ${order.total}</p>

            <hr/>

            <h4>Productos</h4>

            {order.productos.map((prod, index) => (
                <div key={index}>
                    {prod.nombre} — {prod.quantity} x ${prod.precio}
                </div>
            ))}

            <div className="mt-3">

                <button 
                    className="btn btn-warning me-2"
                    onClick={() => handleEstado("Pendiente")}
                    disabled={estado === "Pendiente"}
                >
                    Pendiente
                </button>

                <button 
                    className="btn btn-primary me-2"
                    onClick={() => handleEstado("Enviado")}
                    disabled={estado === "Enviado" || estado === "Entregado"}
                >
                    Enviado
                </button>

                <button 
                    className="btn btn-success"
                    onClick={() => handleEstado("Entregado")}
                    disabled={estado === "Entregado"}
                >
                    Entregado
                </button>

            </div>

            <button 
                className="btn btn-secondary mt-3"
                onClick={() => navigate(-1)}
            >
                Volver atrás
            </button>

        </div>
    );
};

export default AdminPedidoDetalle;