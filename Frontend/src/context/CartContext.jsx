import { createContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    // const [showModal, setShowModal] = useState(false)

    

    const addToCart = (product) => {
        const newCart = [...cart];
        const existingItem = newCart.find(item => item.product.Id === product.Id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            newCart.push({ product, qty: 1 });
        }
        setCart(newCart);
    };



    return (
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;