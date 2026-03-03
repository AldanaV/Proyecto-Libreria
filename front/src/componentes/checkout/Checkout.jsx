import { useContext ,useState } from "react";
import {CartContext} from "../carrito/Carrito";
import { useNavigate } from "react-router-dom";
import './Checkout.css'

const Checkout = () => {
    const {cart, totalPrice, clearCart} = useContext(CartContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre:"",
        email:"",
        direccion:""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const orderId = Math.floor(Math.random() * 100000);
        clearCart();
        navigate("/confirmacion", {state: {orderId, formData}});
    };

    if(cart.length === 0){
        return <h2>Tu carrito esta vacio</h2>;
    }
    
    return(
        <div className="caja">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                required
                className="input form-control mb-2"
                onChange={handleChange}
                />

                <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="input form-control mb-2"
                onChange={handleChange}
                />

                <input
                type="text"
                name="direccion"
                placeholder="Direccion"
                required
                className="input form-control mb-2"
                onChange={handleChange}
                />

                <button className="btn-confirmar">Confirmar compra</button>
            </form>

            <hr/>

            <h4>Resumen del pedido</h4>

            {cart.map(item => (
                <div key={item.id}>
                    {item.nombre} - {item.quantity} x ${item.precio}
                </div>
            ))}

            <h5 className="mt-2">Total: ${totalPrice}</h5>
        </div>
    );
};

export default Checkout;