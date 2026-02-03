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
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';




const NabVarPrincipal = () => {
    
    const [show, setShow] = useState(false);
    const {cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice} = useContext(CartContext);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const handleRemove = (item) => {
    removeFromCart(item.id);
    setToastMsg(`🗑️ ${item.nombre} ha sido eliminado del carrito.`);
    setShowToast(true);
    };

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
                <p>El carrito esta vacío.</p>) : (cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <strong>{item.nombre}</strong>
                        <div className='text-muted'>
                            {item.quantity} x ${item.precio}
                        </div>
                    </div>

                    <div className='d-flex align-items-center gap-2'>
                        <Button className='btn-cantidad' variant='outline-secondary' size='sm' onClick={() => decreaseQuantity(item.id)}>-</Button>
                        <span>{item.quantity}</span>
                        
                        <Button className='btn-cantidad' variant='outline-secondary' size='sm' onClick={() => increaseQuantity(item.id)}>+</Button>
                    </div>


                    <Button className='btn-cantidad' variant="outline-danger" size="sm" onClick={() => handleRemove(item)}>X</Button>
                </div>
                ))
            )}

            <hr />
            
            <div>
                <span>Total: </span>
                <span>${totalPrice}</span>
            </div>
            </Modal.Body>

            <Modal.Footer>
                    <Button className='btn-seguir' variant="secondary" onClick={() => setShow(false)}>Seguir comprando</Button>
                </Modal.Footer>

            </Modal>
            
            <ToastContainer position='bottom-end' className='p-3'>
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={2100} autohide bg='danger'>
                    <Toast.Body className='text-white'>
                        {toastMsg}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            
        </div>
    )
}

export default NabVarPrincipal;