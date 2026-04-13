import {useLocation, Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const PedidoDetalle = () => {
    const {state} = useLocation();
    const order = state?.order;

    if(!order){
        return <h2>No hay pedido.</h2>
    }

    return(
        <div className="container mt-4">
            <h2>Orden #{order.orderNumber}</h2>
            {order.productos.map((prod, i) => (
                <div key={i}>
                    {prod.nombre} - {prod.quantity} x {prod.precio}
                </div>
            ))}

            <hr/>

            <h4>Total: ${order.total}</h4>

            <div className="mt-3">
                <Button as ={Link} to="/mispedidos" className="btn btn-dark mb-2">Atrás</Button>
                <Button as={Link} to="/" className="btn btn-dark">Volver a la tienda</Button>
            </div>
        </div>
    )

    
}

export default PedidoDetalle;