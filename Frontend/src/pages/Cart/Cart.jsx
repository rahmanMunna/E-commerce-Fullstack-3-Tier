import React, { useContext, useState } from 'react';
import CartContext from '../../context/CartContext';

const Cart = () => {
    const { cart } = useContext(CartContext);
    const [step, setStep] = useState(false);

    const subtotal = cart.reduce((sum, c) => {
        const price = c.product.Price - c.product.Price * (c.product.Discount / 100);
        return sum + price * c.qty;
    }, 0);

    const shippingCharge = 60;
    const total = subtotal + shippingCharge;

    // console.log(cart)
    return (

        <div className="p-8 space-y-8 container mx-auto bg-yellow-200 text-amber-800">
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
                            <p>John Doe</p>
                        </div>
                        <div>
                            <p className="font-medium">Shipping Address:</p>
                            <p>123, ABC Street, Dhaka, Bangladesh</p>
                        </div>
                    </div>

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
                </div>

                {/* Right: Cart products */}
                <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Products</h2>
                    <div className="space-y-4">
                        {cart.map((c) => {
                            const price =
                                c.product.Price - c.product.Price * (c.product.Discount / 100);
                            return (
                                <div
                                    key={c.product.Id}
                                    className="flex justify-between items-center border-b pb-2">

                                    <div className="flex-1">
                                        <p className="font-medium">{c.product.Name}</p>
                                        <p className="text-sm text-gray-500">
                                            Tk {price.toFixed(2)} × {c.qty}
                                        </p>
                                    </div>
                                    <div className="font-semibold">
                                        Tk {(price * c.qty).toFixed(2)}
                                    </div>
                                </div>
                            );
                        })}
                        <div className='flex justify-end'>
                            <button onClick={() => setStep(true)} className='btn btn-error'>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Cart;