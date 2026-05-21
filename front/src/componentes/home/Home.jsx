import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Carrusel from '../carrusel/Carrusel';
import './Home.css';
import Footer from '../footer/Footer';

const Home = () => {
    const navigate = useNavigate();
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const fetchTopBooks = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/books/top");
                const data = await res.json();
                // Adaptamos los datos del backend al formato que espera el componente
                const adaptados = data.map(libro => ({
                    ...libro,
                    nombre: libro.titulo,
                    src: libro.imagen
                }));
                setLibros(adaptados);
            } catch (error) {
                console.log("Error al cargar libros top:", error);
            }
        };

        fetchTopBooks();
    }, []);

    const verDetalleClick = (libro) => {
        navigate('/detalle', { state: libro });
    };

    return(
        <div className='container-total'>
            <Carrusel/>
            <div className='container'>
                <h2 className='titulo'>¡Sumérgete en tu próxima aventura!</h2>
                <h5>Top libros más vendidos:</h5>
                <div className='librosVendidos'>
                    {
                        libros.length > 0 ? (
                            libros.map((libro) => (
                                <div className='imagenes' key={libro._id || libro.nombre}>
                                    <img 
                                        src={libro.src}
                                        alt={libro.nombre}
                                        onClick={() => verDetalleClick(libro)}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>Cargando libros más vendidos...</p>
                        )
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;