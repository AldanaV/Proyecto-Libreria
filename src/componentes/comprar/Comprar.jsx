import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Comprar.css'

function CanvaEjemplo() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='boton'>
            <Button className='botonComprar' variant="primary" onClick={handleShow}>
                Comprar
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Carrito</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <h5>Libro: </h5>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default CanvaEjemplo;