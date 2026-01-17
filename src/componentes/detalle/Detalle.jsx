import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../footer/Footer';
import CanvaEjemplo from '../comprar/Comprar';
import './Detalle.css'

const Detalle = () => {
    const location = useLocation();
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
                        <CanvaEjemplo />
                    </div>
                    
                </div>
            </div>
            <Footer />
        </div>
    </>);
};

export default Detalle;