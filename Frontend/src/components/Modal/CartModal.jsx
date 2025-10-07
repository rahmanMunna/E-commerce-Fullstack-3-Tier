import React, { useContext, useRef, useState } from 'react';
import CartContext from '../../context/CartContext';

const CartModal = ({ product, modalId }) => {
    const [qty, setQty] = useState(1)
    const qtyRef = useRef();
    const { addToCart } = useContext(CartContext);

    const handleIncrement = () => {
        const newQty = qty + 1;
        setQty(newQty);
    }
    const handleDecrement = () => {
        const newQty = (qty - 1) < 1 ? qty : (qty - 1);
        setQty(newQty);
    }

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Product Name : {product.Name}</h3>
                <h3 className="font-bold text-lg">Product Price : {product.Price}</h3>
                <h3 className="font-bold text-lg">In Stock : {product.StockQty}</h3>
                <div className='flex gap-2 items-center'>
                    <button onClick={handleIncrement} className='btn btn-secondary text-center text-2xl'>
                        +
                    </button>
                    <span ref={qtyRef} className='font-bold'>{qty}</span>
                    <button onClick={handleDecrement} className='btn btn-error text-3xl '>
                        -
                    </button>
                </div>
                <div className="modal-action">

                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                            onClick={() => addToCart(product, qty)}
                            className="btn btn-primary hover:btn-error hover:scale-105 transform:2s">Add to Cart</button>
                        {/* <button className="btn">Close</button> */}
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default CartModal;