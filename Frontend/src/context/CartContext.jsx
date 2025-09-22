import { createContext, useState } from "react";

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

    // const handleShowModal = () => {
    //     setShowModal(true);
    // }

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;