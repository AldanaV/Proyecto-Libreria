import {createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
        const carritoGuardado = localStorage.getItem("cart");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    // 🔹 Guardar carrito cada vez que cambia
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // 🔹 Agregar al carrito
    const addToCart = (libro) => {
        setCart(prevCart => {
            const existe = prevCart.find(item => item.id === libro.id);

            if (existe) {
                return prevCart.map(item =>
                    item.id === libro.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...libro, quantity: 1 }];
        });
    };

    // 🔹 Eliminar producto
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    // 🔹 Sumar cantidad
    const increaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // 🔹 Restar cantidad (si llega a 0 se elimina)
    const decreaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    // 🔹 Total del carrito
    const totalPrice = cart.reduce(
        (acc, item) => acc + Number(item.precio) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
