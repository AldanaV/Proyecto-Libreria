import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import './Nabvar.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';



const NabVarPrincipal = () => {
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

                        <Link to="/carrito">
                        <Button variant="outline-dark" className="btn-carrito position-relative">
                            <i className="bi bi-cart3 fs-5"></i>
                            <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">4</Badge>
                        </Button>
                    </Link>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NabVarPrincipal;