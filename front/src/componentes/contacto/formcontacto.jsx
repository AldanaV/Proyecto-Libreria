const FormularioContacto = () => {
    return (
        <div className="contenedor-form">
            <div className="contenido-form">
                <h2 id="titulo">Contacto <i class="bi bi-envelope-heart-fill"></i> </h2>
                <form>
                    <div className="input-form">
                        <div className="input-nombre">
                            <label for="nombre">Nombre: </label>
                            <input type="text" id="nombre" placeholder=" Nombre" required />
                        </div>

                        <div className="input-email">
                            <label for="email">Email: </label>
                            <input type="email" id="email" placeholder=" Email" required />
                        </div>

                        <div className="inputMensaje">
                            <label for="mensaje">Mensaje: </label>
                            <input type="text" id="mensaje" placeholder=" Mensaje" required />
                        </div>
                        <div className="btn">
                            <input type="submit" value={"Enviar"}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormularioContacto;