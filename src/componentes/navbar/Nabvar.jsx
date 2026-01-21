import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import './Nabvar.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useState, useContext } from "react";
import { CartContext } from "../carrito/Carrito";
import Modal from 'react-bootstrap/Modal';




const NabVarPrincipal = () => {
    
    const [show, setShow] = useState(false);
    const {cart, removeFromCart, totalPrice} = useContext(CartContext);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (

        <div>
            <Navbar expand="lg" className="bg-body-tertiary ">
                <Container>
                    <Link to='/'>
                        <img src='./iconolibro.png' width='80'/>
                    </Link>

                    <Navbar.Brand as={Link} to="/">Libreria Nocturna</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/libros">Libros</Nav.Link>
                            <Nav.Link as={Link} to="/ingles">Libros en inglés</Nav.Link>
                            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                        </Nav>

                        
                        <Button variant="outline-dark" className="btn-carrito position-relative" onClick={() => setShow(true)}>
                            <i className="bi bi-cart3"></i>{totalItems > 0 && (
                                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">{totalItems}
                                </Badge>
                            )}
                        </Button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tu carrito</Modal.Title>
                </Modal.Header>

            <Modal.Body>
                {cart.length === 0 ? (
                <p>El carrito está vacío</p>) : (cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <strong>{item.nombre}</strong>
                        <div className='text-muted'>
                            {item.quantity} x ${item.precio}
                        </div>
                    </div>

                    <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>X</Button>
                </div>
                ))
            )}

            <hr />
            
            <div>
                <span>Total</span>
                <span>${totalPrice}</span>
            </div>
            </Modal.Body>

            <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Seguir comprando</Button>
                </Modal.Footer>

            </Modal>

            
        </div>
    )
}

export default NabVarPrincipal;