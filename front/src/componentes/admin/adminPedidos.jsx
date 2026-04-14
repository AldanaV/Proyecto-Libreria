import { useEffect, useState } from "react";

const AdminPedidos = () => {
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/api/orders/admin/orders",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then (data => {
            if(Array.isArray(data)){
                setOrders(data);
            }else{
                console.log("Error back: ", data);
                setOrders([]);
            }
        })
        .catch(err => console.log(err));
    }, []);

    return(
        <div className="container mt-4">
            <h2>Panel de pedidos</h2>
            {orders.length === 0 && <p>No hay pedidos.</p>}

            {orders.map(order => (
                <div key={order._id} className="card p-3 mb-3">
                    <h5>Orden #{order.orderNumber}</h5>
                    <p>
                        Cliente: {order.cliente?.nombre || order.user?.nombre}
                    </p>

                    <p>
                        Email: {order.cliente?.email || order.user?.email}
                    </p>

                    <p>Total: ${order.total}</p>

                    <p>Dirección: {order.direccion}</p>

                    <div className="mt-2">
                        <strong>Productos:</strong>

                        {order.productos.map((prod, index) => (
                            <div key={index} className="ms-2">
                                {prod.nombre} — {prod.quantity} x {prod.precio}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AdminPedidos;