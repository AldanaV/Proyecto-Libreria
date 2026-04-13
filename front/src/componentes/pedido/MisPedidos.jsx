import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const MisPedidos = () =>{
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("USER EN MISPEDIDOS: ", user);

        if(!user || !user.id){
            console.log("No hay usuario logueado.")
            return;
        }

        fetch(`http://localhost:5000/api/orders/user/${user.id}`)
        .then(res => res.json())
        .then(data => {
            console.log("ORDERS:", data);
            if(Array.isArray(data)){
                setOrders(data);
            }else{
                setOrders([]);
            }
        })
        .catch(err => console.log(err));
        
    }, []);

    return(
        <div className="container mt-4">
            <h2>Mis pedidos</h2>
            {orders.length === 0 && <p>Todavía no tenes ningún pedido.</p>}
            {orders.map(order => (
                <Link 
                    key={order._id}
                    to="/pedido"
                    state={{order}}
                    className="card p-3 mb-3 text-decoration-none text-dark"
                >
                    <h5>Orden #{order.orderNumber}</h5>
                    <p>Total: ${order.total}</p>
                </Link>
                
            ))}
        </div>
    );

};

export default MisPedidos;