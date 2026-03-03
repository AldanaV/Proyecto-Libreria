import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import novedades1 from '../imagenes/novedades1.jpg' 
import novedades2 from '../imagenes/novedades2.jpg'
import novedades3 from '../imagenes/novedades3.jpg' 
import './Carrusel.css'

function Carrusel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img 
                    className="d-lock w-100"
                    src={novedades1}
                    alt='First slide'
                />
            </Carousel.Item>
            <Carousel.Item>
                <img 
                    className="d-lock w-100"
                    src={novedades2}
                    alt='Second slide'
                />
            </Carousel.Item>
            <Carousel.Item>
                <img 
                    className="d-lock w-100"
                    src={novedades3}
                    alt='Third slide'
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Carrusel;