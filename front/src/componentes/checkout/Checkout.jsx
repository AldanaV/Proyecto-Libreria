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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const user = JSON.parse(localStorage.getItem("user"));
            const order = {
                user: user.id,
                nombre: formData.nombre,
                email: formData.email,
                productos: cart,
                total: totalPrice,
                direccion: formData.direccion
            };

            const res = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(order)
            });

            

    const data = await res.json();

            clearCart();

            navigate("/confirmacion", 
                {state: 
                    { orderNumber: data.orderNumber, 
                        user: user 
                    } 
                });
        } catch (error){
            console.log("Error al crear la orden");
        }
    };

    if(!cart || cart.length === 0){
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