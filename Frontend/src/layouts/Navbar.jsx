import { useContext } from "react";
import CartContext from "../context/CartContext"

const Navbar = () => {
    const { cart } = useContext(CartContext);
    return (
        <div>
            Cart : {cart.length}
        </div>
    );
};

export default Navbar;