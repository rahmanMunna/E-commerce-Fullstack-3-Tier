import React, { useContext, useState } from 'react';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import AuthContext from '../../context/AuthContext';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [step, setStep] = useState(false);
    const {user} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleRemove = (pId) => {
        const newCart = cart.filter(p => p.product.Id !== pId)
        setCart(newCart);
    }

    const handleDecrease = (pId) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.product.Id === pId
                        ? { ...item, qty: item.qty - 1 } // create a new object
                        : item
                )
                .filter(item => item.qty > 0) // remove if qty becomes 0
        );
    };

    const handleIncrease = (pId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.product.Id === pId
                    ? { ...item, qty: item.qty + 1 } // new object
                    : item
            )
        );
    };

    const handlePlaceOrder = () => {

        // make a proper  structure to send to backend
        const cartItem = [];
        for (const c of cart) {
            cartItem.push(
                {
                    ProductId: c.product.Id,
                    Qty: c.qty,
                    Price: c.product.Price,
                    Discount: c.product.Discount
                }
            )
        }

        fetch("https://localhost:44381/api/order/place", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartItem)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to place order");
                }
                return res.json();
            })
            .then(data => {
                if (data) {
                    setCart([]); // clear cart after success

                    toast.success("Item added to cart!", {
                        position: "top-right",
                        theme: "colored", // "light" | "dark" | "colored"
                        style: {
                            background: "linear-gradient(to right, #4f46e5, #9333ea, #ec4899)",
                            color: "#fff",
                            fontWeight: "500",
                            borderRadius: "12px",
                            padding: "12px 16px",
                        },
                    });

                    navigate("customerDashboard");

                }
            })
            .catch(err => console.error("Error:", err));


        setStep(true);
    }

    const subtotal = cart.reduce((sum, c) => {
        const price = c.product.Price - c.product.Price * (c.product.Discount / 100);
        return sum + price * c.qty;
    }, 0);

    const shippingCharge = 60;
    const total = subtotal + shippingCharge;

    // console.log(cart)
    return (

        <div className='p-8 space-y-8 mt-4 container mx-auto bg-amber-50 text-amber-800'>
            {
                cart.length > 0 ?
                    <div>
                        {/* Steps */}
                        <ul className="steps w-full mb-8">
                            <li className="step step-primary">Add to Cart</li>
                            <li className="step step-primary">Confirm Shipping Address</li>
                            <li className={`step ${step ? "step-primary" : ""}`}>Place Order</li>
                        </ul>

                        {/* Main content */}
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left: Customer info & summary */}
                            <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-md space-y-6">
                                <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="font-medium">Name:</p>
                                        <p>{user?.Name}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Shipping Address:</p>
                                        <p>{user?.ShippingAddress?.City},{user?.ShippingAddress?.Location}</p>
                                    </div>
                                </div>
                                {/* Order summary */}
                                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>Tk {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping:</span>
                                        <span>Tk {shippingCharge.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                                        <span>Total:</span>
                                        <span>Tk {total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <hr />
                                {/* Payment method */}
                                <h2 className="text-2xl font-semibold mb-4">Payment</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Method</span>
                                        <span>
                                            <input type="radio" name="radio-1" className="radio" checked="checked" /> Cash on Delivery
                                        </span>
                                    </div>

                                    <div className="flex justify-between  ">
                                        <span>Amount</span>
                                        <span className='text-lg font-bold'>Tk {total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Cart products */}
                            <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-4">Products</h2>
                                <div className="space-y-4">
                                    {cart.map((c) => {
                                        const price =
                                            c.product.Price - c.product.Price * (c.product.Discount / 100);
                                        return (
                                            <div key={c.product.Id} className="relative border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
                                                {/* X Button */}
                                                <button
                                                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition"
                                                    onClick={() => handleRemove(c.product.Id)}
                                                >
                                                    ✕
                                                </button>

                                                {/* Cart Item */}
                                                <div key={c.product.Id} className="flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800">{c.product.Name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Tk {price.toFixed(2)} × {c.qty}
                                                        </p>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <button
                                                                disabled={c.qty === 1}
                                                                className={`w-7 h-7 flex items-center justify-center rounded-full border 
                                                                ${c.qty === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-200"}`}
                                                                onClick={() => handleDecrease(c.product.Id)}
                                                            >
                                                                –
                                                            </button>

                                                            <span className="font-semibold">{c.qty}</span>
                                                            <button
                                                                className="w-7 h-7 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-200"
                                                                onClick={() => handleIncrease(c.product.Id)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Total Price */}
                                                    <div className="font-semibold text-blue-700">
                                                        Tk {(price * c.qty).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>


                                        );
                                    })}
                                    <div className='flex justify-end'>
                                        <button onClick={handlePlaceOrder} className='btn btn-error'>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='text-center text-3xl'>
                        Cart is empty
                    </div>
            }
        </div>
    );
};

export default Cart;