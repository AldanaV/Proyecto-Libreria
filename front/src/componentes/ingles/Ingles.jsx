import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Ingles.css'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Footer from '../footer/Footer';

const LibrosIngles = () => {
    const navigate = useNavigate();

    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/books");
                const data = await res.json();

                // 🔥 FILTRAR SOLO INGLÉS
                const filtrados = data.filter(
                    libro => libro.idioma === "Ingles" || libro.idioma === "Inglés"
                );

                // 🔥 Adaptar formato
                const adaptados = filtrados.map(libro => ({
                    src: libro.imagen,
                    nombre: libro.titulo,
                    descripcion: "",
                    precio: `$${libro.precio}`,
                    editorial: libro.editorial,
                    paginas: "",
                    isbn: libro.isbn,
                    categoria: libro.categoria,
                    autor: libro.autor
                }));

                setLibros(adaptados);

            } catch (error) {
                console.log(error);
            }
        };

        fetchLibros();
    }, []);

    const verDetalleClick = (libro) => {
        navigate('/detalle', { state: libro });
    };

    return (
        <div className="container-libros">

            {/* 🔝 TÍTULO */}
            <div className="libros-titulo">
                <h1>Libros en inglés</h1>

                <div className="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Libros en inglés</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>

            {/* 📚 LIBROS */}
            <div className="container-imagenes">
                {libros.length === 0 ? (
                    <p>No hay libros en inglés</p>
                ) : (
                    libros.map((libro, index) => (
                        <div className='imagenes' key={index}>
                            <img 
                                src={libro.src || "https://via.placeholder.com/150"}
                                alt={libro.nombre}
                                onClick={() => verDetalleClick(libro)}
                            />
                        </div>
                    ))
                )}
            </div>

            <Footer />
        </div>
    )
}

export default LibrosIngles;