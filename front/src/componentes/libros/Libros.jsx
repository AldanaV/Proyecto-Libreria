import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Libros.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Footer from '../footer/Footer';

const Libros = () => {
    const navigate = useNavigate();

    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/books");
                const data = await res.json();

                // 🔥 SOLO libros en español
                const filtrados = data.filter(
                    libro => libro.idioma === "Español"
                );

                // 🔥 Adaptar al formato de la UI
                const adaptados = filtrados.map(libro => ({
                    src: libro.imagen, // 👈 imagen desde backend
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

            {/* 🔝 TÍTULO + BREADCRUMB */}
            <div className="libros-titulo">
                <h1>Libros</h1>

                <div className="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Libros</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>

            {/* 📚 LISTA DE LIBROS */}
            <div className="container-imagenes">

                {libros.length === 0 ? (
                    <p>No hay libros disponibles</p>
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
    );
};

export default Libros;