import { useLocation, Link } from "react-router-dom";
import './Confirmacion.css'

const Confirmacion = () => {
    const location = useLocation();
    const { orderId, formData } = location.state || {};
    
    return (
        <div className="caja container mt-4">
            <h2>¡Gracias por tu compra!</h2>
            <p>Número de orden: <strong>{orderId}</strong></p>
            <p>Cliente: {formData?.nombre}</p>

            <Link to="/" className="btn btn-dark mt-3">Volver</Link>
        </div>
    );
};

export default Confirmacion;