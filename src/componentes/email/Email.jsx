import React, { useState } from 'react';
import './Email.css'

const GuardarEmail = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSaveEmail = () => {
        localStorage.setItem('userEmail', email);
    };

    return (
        <div>
            <div className="cajaCorreo">
                <div className="tituloCorreo">
                    <form>
                        <div className="input-novedades">
                            <h5>Dejanos tu email para enterarte de las próximas novedades</h5>
                            <input
                                type="email"
                                id="correo"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Ingresa tu email" required
                            />
                        </div>
                        <div className="btn-novedades">
                            <button onClick={handleSaveEmail}>
                                Enviar Email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GuardarEmail;