import { useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const PedidoDetalle = () => {

    const { state } = useLocation();
    const orderId = state?.orderId;

    const [order, setOrder] = useState(null);

    useEffect(() => {

        if(!orderId) return;

        fetch(`http://localhost:5000/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => {
            console.log("ORDER DETALLE:", data);
            setOrder(data);
        })
        .catch(err => console.log(err));

    }, [orderId]);

    if(!order){
        return <h2>Cargando pedido...</h2>;
    }

    return(
        <div className="container mt-4">

            <h2>Orden #{order.orderNumber}</h2>

            <p>
                Estado:
                <span className="badge bg-info ms-2">{order.estado}</span>
            </p>

            <hr/>

            {order.productos.map((prod, i) => (
                <div key={i}>
                    {prod.nombre} - {prod.quantity} x ${prod.precio}
                </div>
            ))}

            <hr/>

            <h4>Total: ${order.total}</h4>

            <div className="mt-3">
                <Button as={Link} to="/mispedidos" className="btn btn-dark mb-2">
                    Atrás
                </Button>

                <Button as={Link} to="/" className="btn btn-dark">
                    Volver a la tienda
                </Button>
            </div>

        </div>
    );
};

export default PedidoDetalle;