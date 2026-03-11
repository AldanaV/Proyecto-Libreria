import { useLocation, Link } from "react-router-dom";
import './Confirmacion.css'

const Confirmacion = () => {

    const location = useLocation();

    if(!location.state){
        return <h2>No hay orden para mostrar.</h2>
    }

    const { orderNumber, user } = location.state;

    return (
        <div className="caja container mt-4">
            <h2>¡Gracias por tu compra {user?.nombre || "cliente"}!</h2>
            <p>Número de orden: <strong>#{orderNumber}</strong></p>

            <Link to="/" className="btn btn-dark mt-3">
                Volver a la tienda
            </Link>
        </div>
    );
};

export default Confirmacion;