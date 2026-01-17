import GuardarEmail from '../email/Email';
import './Footer.css';

function Footer() {
    return (

        <div>
            <section className="seccion">
                <div className="cajaPrincipal">
                    <div className="cajaSecundaria">
                        <div className="itemInfo">
                            <p className="imagenCaja">
                                <i class="bi bi-box2-heart-fill"></i>
                            </p>
                            <div className="tituloItem">
                                <h5>ENVIO GRATIS</h5>
                                <h6>En compras superiores a $40.000</h6>
                            </div>
                        </div>
                        <div className="itemInfo">
                            <p className="imagenCaja">
                                <i class="bi bi-cash-coin"></i>
                            </p>
                            <div className="tituloItem">
                                <h5>DESCUENTO DE 10%</h5>
                                <h6>Compras en efectivo</h6>
                            </div>
                        </div>
                        <div className="itemInfo">
                            <p className="imagenCaja">
                                <i class="bi bi-geo-alt-fill"></i>
                            </p>
                            <div className="tituloItem">
                                <h5>PUNTOS DE ENTREGA</h5>
                                <h6>Quilmes - Constitución - Balvanera</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <GuardarEmail />

            <footer>
                <div className="footer">
                    <p>Derechos reservados © Libreria Nocturna 2024 </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;