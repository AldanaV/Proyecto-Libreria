import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../footer/Footer';
import './Detalle.css'
import { useContext } from "react";
import { CartContext } from '../carrito/Carrito';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { ToastBody } from 'react-bootstrap';


const Detalle = () => {
    const [showToast, setShowToast] = useState(false);
    const location = useLocation();
    const { addToCart } = useContext(CartContext);

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [src, setSrc] = useState('');
    const [precio, setPrecio] = useState('');
    const [autor, setAutor] = useState('');
    const [paginas, setPaginas] = useState('');
    const [categoria, setCategoria] = useState('');
    const [isbn, setIsbn] = useState('');
    const [editorial, setEditorial] = useState('');

    useEffect(() => {
        const { nombre, descripcion, src, precio, autor, paginas, categoria, isbn, editorial } = location.state || {};
        setNombre(nombre);
        setDescripcion(descripcion);
        setSrc(src);
        setPrecio(precio);
        setAutor(autor);
        setPaginas(paginas);
        setCategoria(categoria);
        setIsbn(isbn);
        setEditorial(editorial);
    }, []);

    const libro = {id: isbn, 
        nombre, 
        descripcion, 
        src, 
        precio: Number
        (String(precio || 0)
      .replace('$', '')
      .replace('.', '')
      .replace(',', '.')), 
        autor, 
        paginas, 
        categoria, 
        isbn, 
        editorial};

    return (<>
        <div className="cajaDescripcion">
            <div className="tituloLibro">
                <div className="libroImg">
                    <img src={src}></img>
                </div>
                <div className="libroInfo">
                    <h2>{nombre}</h2>
                    <br></br>
                    <p className='info'><span>PRECIO: </span>{precio}</p>
                    <p className='descripcion'>{descripcion}</p>
                    <p className='info'><span>EDITORIAL: </span>{editorial}</p>
                    <p className='info'><span>AUTOR: </span>{autor}</p>
                    <p className='info'><span>PAGINAS: </span>{paginas}</p>
                    <p className='info'><span>CATEGORIA: </span>{categoria}</p>
                    <p className='info'><span>ISBN: </span>{isbn}</p>

                    <div className='containerBtn'>
                        <button className='btnComprar' onClick={() => { addToCart(libro); setShowToast(true);}}>Agregar al carrito</button>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </div>

        <ToastContainer position='bottom-end' className='p-3'>
            <Toast className='toastColor' show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
                <ToastBody className='text-white'>
                    📘 {nombre} Agregado al carrito.
                </ToastBody>
            </Toast>
        </ToastContainer>

    </>);
};

export default Detalle;