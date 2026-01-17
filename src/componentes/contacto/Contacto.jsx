import React from 'react';
import '../navbar/Nabvar.css'
import './Contacto.css';
import FormularioContacto from './formcontacto';
import Footer from '../footer/Footer';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const Contacto = () => {
    return (
        <div className='nosotros'>
            <h1>¡Contáctanos!</h1>
            <div className="breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Contacto</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <p>¡Bienvenido/a a nuestra librería online "Libreria Nocturna"! En este espacio, la pasión por la lectura se une a la comodidad de la compra digital. Cada libro que ofrecemos ha sido elegido con esmero, creemos que cada uno de ellos tiene una historia que contar, y nuestra misión es conectar a los lectores con sus próximas grandes lecturas.

                Si te gusta nuestra dedicación y compromiso con tus pequeños pero grandes tesoros, no dudes en hacernoslo saber.

                ¡Y nunca olvides que estamos abiertos a cualquier recomendación para mejorar cada vez más nuestra calidad de venta y atención al cliente!</p>


            <FormularioContacto />
            <Footer />
        </div>
    )
}

export default Contacto;