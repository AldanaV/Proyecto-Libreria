import { useLocation, Link } from "react-router-dom";
import './Confirmacion.css'

const Confirmacion = () => {
    const location = useLocation();

    if(!location.state){
        return <div className="container mt-5 text-center"><h2>No hay orden para mostrar.</h2></div>
    }

    const { orderNumber, user, orderDetails } = location.state;
    const details = orderDetails || {};

    return (
        <div className="confirmacion-wrapper container mt-5 mb-5">
            <div className="confirmacion-header mb-5">
                <p className="status-text mb-2">¡Tu pedido ya está en proceso!</p>
                <h1 className="thanks-title mb-3">Gracias por tu compra, {details.nombre || user?.nombre || "cliente"}.</h1>
                
                <div className="order-badge mb-4">
                    Orden #{orderNumber} 
                    <i className="bi bi-copy ms-2 copy-icon" onClick={() => navigator.clipboard.writeText(orderNumber)} title="Copiar"></i>
                </div>

                <p className="email-notice text-muted">
                    Te enviaremos los detalles a <strong>{details.email || "tu correo"}</strong>. Si no te llega en los próximos 30 minutos, recordá revisar tu correo spam o hacé el seguimiento desde <Link to="/mispedidos">Mis pedidos</Link>.
                </p>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="info-card h-100">
                        <h4 className="card-heading">Pedido</h4>
                        <hr />
                        
                        <div className="info-group">
                            <label>Teléfono</label>
                            <p>{details.telefono || "-"}</p>
                        </div>
                        
                        <div className="info-group">
                            <label>Entrega</label>
                            <p>{details.entrega || "-"}</p>
                        </div>

                        <div className="info-group mb-0">
                            <label>Dirección</label>
                            <p className="mb-0">{details.direccion || "-"}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="info-card h-100">
                        <h4 className="card-heading">Pago</h4>
                        <hr />
                        
                        <div className="info-group">
                            <label>Medio de pago</label>
                            <p>{details.pagoMetodo || "-"}</p>
                        </div>

                        <div className="info-group total-group mt-4 pt-3 border-top mb-0 d-flex justify-content-between align-items-center">
                            <label className="mb-0">Total</label>
                            <p className="total-amount mb-0">$ {details.total?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <Link to="/" className="btn btn-dark btn-lg px-5">
                    Volver a la tienda
                </Link>
            </div>
        </div>
    );
};

export default Confirmacion;