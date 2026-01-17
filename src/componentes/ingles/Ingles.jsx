import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Ingles.css'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import thesongofachilles from '../imagenes/thesongofachilles.png'
import solitaire from '../imagenes/solitaire.png'
import thelove from '../imagenes/thelove.png'
import once from '../imagenes/once.png'
import Footer from '../footer/Footer';

const LibrosIngles = () => {
    const navigate = useNavigate();
    const [libros, setLibros] = useState([
        {
            src: thesongofachilles,
            nombre: 'THE SONG OF ACHILLES', 
            descripcion: 'Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. Despite their differences, Achilles befriends the shamed prince, and as they grow into young men skilled in the arts of war and medicine, their bond blossoms into something deeper - despite the displeasure of Achilles’s mother Thetis, a cruel sea goddess. But when word comes that Helen of Sparta has been kidnapped, Achilles must go to war in distant Troy and fulfill his destiny. Torn between love and fear for his friend, Patroclus goes with him, little knowing that the years that follow will test everything they hold dear.',
            precio: '$15.599',
            editorial: 'BLOOMSBURY PUBLISHING',
            paginas: '368',
            isbn: '9781408891384',
            autor : 'MADELLINE, MILLER'
        },
        {
            src: solitaire,
            nombre: 'SOLITAIRE', 
            descripcion: 'My name is Tori Spring. I like to sleep and I like to blog. Last year I had friends. Things were very different, I guess, but that is all over now. Now there is Solitaire. And Michael Holden. I dont know what Solitaire are trying to do. And I dont care about Michael Holden. I relly dont.',
            precio: '$20.219,76',
            editorial: 'HARPER COLLINS UK',
            paginas: '400',
            isbn: '9780007559220',
            autor: 'OSEMAN, ALICE',
        },
        {
            src: thelove,
            nombre: 'THE LOVE HYPOTHESIS', 
            descripcion: 'When a fake relationship between scientists meets the irresistible force of attraction, it throws one woman’s carefully calculated theories on love into chaos. As a third-year Ph.D. candidate, Olive Smith doesn’t believe in lasting romantic relationships but her best friend does, and that’s what got her into this situation. Convincing Anh that Olive is on her way to a happily ever after was always going to be tough, scientists require proof. So, like any self-respecting woman, Olive panics and kisses the first man she sees. That man is none other than Adam Carlsen, a young hotshot professor and well-known ass. Which is why Olive is positively floored when he agrees to keep her charade a secret and be her fake boyfriend. But when a big science conference goes haywire and Adam surprises her again with his unyielding support (and his unyielding abs), their little experiment feels dangerously close to combustion. Olive soon discovers that the only thing more complicated than a hypothesis on love is putting her own heart under the microscope.',
            precio: '$20.219,76',
            editorial: 'SPHERE - HACHETTE UK DISTRIBUTION',
            paginas: '356',
            isbn: '9781408725764',
            autor: 'HAZELWOOD, ALI',
        },
        {
            src: once,
            nombre: 'ONCE UPON A BROKEN HEART', 
            descripcion: 'For as long as she can remember, Evangeline Fox has believed in true love and happy endings . . . until she learns that the love of her life will marry another. Desperate to stop the wedding and to heal her wounded heart, Evangeline strikes a deal with the charismatic, but wicked, Prince of Hearts. In exchange for his help, he asks for three kisses, to be given at the time and place of his choosing. But after Evangeline’s first promised kiss, she learns that bargaining with an immortal is a dangerous game — and that the Prince of Hearts wants far more from her than she’d pledged. He has plans for Evangeline, plans that will either end in the greatest happily ever after, or the most exquisite tragedy.',
            precio: '$16.000',
            editorial: 'FLATIRON BOOKS',
            paginas: '432',
            isbn: '9781250268402',
            autor: 'GARBER, STEPHANIE',
        },
    ]);

    const verDetalleClick = (libro) => {
        navigate('/detalle', { state: libro });
    };

    return (
        <div className="container-libros">
            <div className="libros-titulo">
                <h1>Libros en inglés</h1>
                <div className="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Libros en inglés</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className="container-imagenes">
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
            <Footer />
        </div>
    )
}
export default LibrosIngles;