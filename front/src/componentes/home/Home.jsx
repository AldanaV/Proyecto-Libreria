import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Carrusel from '../carrusel/Carrusel';
import './Home.css';
import wolf from '../imagenes/wolf.png'
import reino from '../imagenes/reino.png'
import graceling from '../imagenes/graceling.png'
import felices from '../imagenes/felices.png'
import aquiles from '../imagenes/aquiles.png'
import Footer from '../footer/Footer';

const Home = () => {
    const navigate = useNavigate();
    const [libros, setLibros] = useState([
        {
            src: wolf,
            nombre: 'LA CANCION DEL LOBO', 
            descripcion: 'Ox nunca tuvo a nadie, hasta que un extraño chico le tendió la mano y lo condujo a un mundo donde lo maravilloso es posible. Le dio un hogar. Una familia. Una manada. Pero allí donde vive lo increíble también lo hacen las pesadillas. Y aunque Ox es solo un humano, muy pronto deberá alzar su aullido y pelear con uñas y dientes por quienes ama. Cae en las garras de la historia que ha cautivado a miles de lectores en todo el mundo.',
            precio: '$23.000',
            editorial: 'V&R EDITORAS SA',
            paginas: '704',
            isbn: '9789877475173',
            categoria: 'Ficción contemporánea',
            autor : 'KLUNE, T.J.'
        },
        {
            src: reino,
            nombre: 'EL REINO DE LOS MALDITOS', 
            descripcion: 'Emilia se siente conmocionada tras descubrir algo impactante sobre su hermana, Vittoria. Pero antes de enfrentarse a los demonios de su pasado, Emilia anhela reclamar a su rey, el seductor príncipe de la Ira. No solo desea su cuerpo; anhela su corazón y su alma, pero el enigmático demonio no puede prometérselos. Cuando un miembro de alto rango de la corte de la Avaricia es asesinado, se encuentran pruebas condenatorias que, de alguna manera, señalan a Vittoria como la asesina. Y Emilia hará lo que sea para llegar al fondo de esas acusaciones contra su hermana. Emilia y Wrath se ven inmersos en un juego de engaños y pecados para resolver el asesinato y poner fin al malestar que se está gestando entre brujas, demonios, cambiaformas y las enemigas más traicioneras de todas: las Temidas. Pero... ¿y si sus enemigos están mucho mas cerca de lo que ella imagina?',
            precio: '$29.800',
            editorial: 'PUCK',
            paginas: '448',
            isbn: '9789878977294',
            categoria: 'Ficción contemporánea',
            autor: 'MANISCALCO, KERRI',
        },
        {
            src: graceling,
            nombre: 'GRACELING', 
            descripcion: 'FUEGO vive en Los Valles, donde los bosques están llenos de espías y ladrones, y donde los nobles rebeldes conspiran contra el joven rey Nash. Con una apariencia salvaje e irresistible, Fuego es el último monstruo con forma humana. La odian y adoran a partes iguales por su singular habilidad para controlar las mentes, pero no hace uso de su poder porque no está dispuesta a robarle los secretos a la gente inocente, sobre todo cuando ella esconde tantos. Entonces el príncipe Brigan acude a ella. La familia real necesita su ayuda. Lejos de casa, Fuego empieza a darse cuenta de que su poder es mayor de lo que había soñado jamás. Y de que hay más sueños por cumplir de lo que se había permitido creer.',
            precio: '$29.000',
            editorial: 'PUCK',
            paginas: '480',
            isbn: '9789878977195',
            categoria: 'Ficción contemporánea',
            autor: 'CASHORE, KRISTIN',
        },
        {
            src: felices,
            nombre: 'ASÍ QUE ESTO ES UN FELICES PARA SIEMPRE', 
            descripcion: '¿Crees en los «y vivieron felices para siempre»? ¿Hay algo que pueda salir realmente mal después de destruir al villano de la historia? Pues sí, y Arek es la prueba de ello. Ahora que se ha hecho con el trono del reino, debe encontrar consorte… o morir lentamente (lo prometo, no es broma). Antes de que empieces a leer, te lo advertimos: puedes caer bajo un poderoso hechizo... Esta historia ¿de amor? (lo dejamos a tu criterio) puede robarte el corazón, algunas carcajadas, y los protagonistas... ¡Un momento! No podemos contarte esa parte. Descúbrelo tú mismo. Arek no había pensado qué ocurriría tras cumplir la profecía que decía que estaba destinado a salvar al reino de Ere del dominio del mal. Así que ahora que por fin ha logrado (con algo de torpeza) cortarle la cabeza al malvado rey (resulta que la espada mágica que sacó del pantano no venía afilada), él y su variopinto grupo de compañeros de aventuras están un poco perdidos y no saben qué hacer. Como salvaguardia temporal, el mejor amigo mago de Arek, Matt, le convence para que asuma el trono hasta que rescaten a la legítima heredera de la torre. Solo que está muerta. Ahora Arek es el rey y está atrapado en un puesto que tiene trampa: elegir a su alma gemela antes de su decimoctavo cumpleaños o debilitarse hasta morir. Faltan tres meses para su cumpleaños y solo Matt conoce el secreto, así que Arek se embarca en una misión desesperada para encontrar consorte y salvar su vida… empezando por sus compañeros de aventuras. Pero sus intentos de cortejar a sus amigos salen bastante mal, aunque con mucha gracia… hasta que descubre que el amor puede haber estado frente a él todo este tiempo.',
            precio: '$24.300',
            editorial: 'PUCK',
            paginas: '352',
            isbn: '9789878977188',
            categoria: 'Ficción contemporánea',
            autor: 'F.T, LUKENS',
        },
        {
            src: aquiles,
            nombre: 'LA CANCIÓN DE AQUILES', 
            descripcion: 'Grecia en la era de los héroes. Patroclo, un príncipe joven y torpe, ha sido exiliado al reino de Ftía, donde vive a la sombra del rey Peleo y su hijo divino, Aquiles. Aquiles, el mejor de los griegos, es todo lo que no es Patroclo: fuerte, apuesto, hijo de una diosa. Un día Aquiles toma bajo su protección al lastimoso príncipe y ese vínculo provisional da paso a una sólida amistad mientras ambos se convierten en jóvenes habilidosos en las artes de la guerra.Pero el destino nunca está lejos de los talones de Aquiles. Cuando se extiende la noticia del rapto de Helena de Esparta, se convoca a los hombres de Grecia para asediar la ciudad de Troya. Aquiles, seducido por la promesa de un destino glorioso, se une a la causa, y Patroclo, dividido entre el amor y el miedo por su compañero, lo sigue a la guerra. Poco podía imaginar que los años siguientes iban a poner a prueba todo cuanto habían aprendido y todo cuanto valoraban profundamente.',
            precio: '$38.781,50',
            editorial: 'ALIANZA',
            paginas: '392',
            isbn: '9788413622132',
            categoria: 'Literatura general',
            autor: 'MADELINE, MILLER',
        },
        
    ]);

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
                        libros.map((libro) => (
                            <div className='imagenes' key={libro.nombre}>
                                <img 
                                    src={libro.src}
                                    alt={libro.nombre}
                                    onClick={() => verDetalleClick(libro)}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;