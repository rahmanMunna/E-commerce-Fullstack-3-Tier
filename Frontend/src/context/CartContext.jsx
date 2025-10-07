import { createContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    const addToCart = (product,qty) => {
        console.log(product)
        const newCart = [...cart];
        const existingItem = newCart.find(item => item.product.Id === product.Id);
        if (existingItem) {
            existingItem.qty += qty;
        }
        else {
            newCart.push({ product, qty: qty });
            toast.info(`${product.Name} has been added`)
        } setCart(newCart);
    };

   
    return (
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;