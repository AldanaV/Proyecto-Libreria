import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import './Nabvar.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../carrito/Carrito";
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { ModalBody } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';





const NabVarPrincipal = () => {
    
    const [show, setShow] = useState(false); //Modal del carrito
    const {cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice} = useContext(CartContext);
    const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const handleRemove = (item) => {
    removeFromCart(item.id);
    setToastMsg(`🗑️ ${item.nombre} ha sido eliminado del carrito.`);
    setShowToast(true);
    };

    const [user, setUser] = useState(null);
    useEffect(() => {
        const loadUser = () =>{
            const storedUser = localStorage.getItem("user");
            if(storedUser){
                setUser(JSON.parse(storedUser));
            } else{
                setUser(null);
            }
        };

        loadUser();

        window.addEventListener("userChanged", loadUser);

        return() => {
            window.removeEventListener("userChanged", loadUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
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

                        

                        {user ?(
                            <Dropdown
                            onMouseEnter={(e) => e.currentTarget.click()}
                            onMouseLeave={(e) => e.currentTarget.click()}
                            >
                                <Dropdown.Toggle variant="link" className='btn-user' size='sm' id='dropdown-user'>
                                    Hola, {user.nombre}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>

                                    <Dropdown.Item as={Link} to="/mispedidos">
                                        Mis pedidos
                                    </Dropdown.Item>

                                    <Dropdown.Item onClick={handleLogout}>
                                        Cerrar sesión
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ): (
                            <Button as={Link} to="/account/Login" variant='outline-dark' className='btn-perfil'>
                                <i className="bi bi-person-circle"></i>
                            </Button>
                        )}

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
                {!cart || cart.length === 0 ? (
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
                    <Button className='btn-seguir' onClick={() => {const token = localStorage.getItem("token");
                        if(!token){
                            alert("Debes iniciar sesión para finalizar la compra.");
                        }
                        setShow(false);
                    }}as={Link} to="/checkout">Finalizar compra</Button>
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