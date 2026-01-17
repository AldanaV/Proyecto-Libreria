import { children, createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (libro) => {
        setCart((prevCart) => {
            const exists = prevCart.find(item => item.id === libro.id);

            if(exists){
                return prevCart.map(item =>
                    item.id === libro.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
                );
            }

            return [...prevCart, {...libro, quantity: 1}];
        });
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id != id));
    };

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
};