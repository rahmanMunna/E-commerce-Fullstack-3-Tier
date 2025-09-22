import { useContext } from "react";
import CartContext from "../context/CartContext"


const ProductCard = ({ product }) => {

    const { addToCart } = useContext(CartContext);

    const discountedPrice = product.Price - product.Price * (product.Discount / 100);

    return (

        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.Name}
                </h3>

                {/* Price Section */}
                <div className="flex items-center mb-2">
                    <span className="text-gray-400 line-through mr-2">Tk {product.Price}</span>
                    <span className="text-red-600 font-bold text-lg">Tk {discountedPrice.toFixed(2)}</span>
                    {product.Discount > 0 && (
                        <span className="ml-auto bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                            -{product.Discount}%
                        </span>
                    )}
                </div>

                {/* Stock */}
                <p className={`text-sm font-medium ${product.StockQty > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                    {product.StockQty > 0 ? `${product.StockQty} in stock` : "Out of stock"}
                </p>

                {/* Add to Cart Button */}
                <button onClick={() => addToCart(product)}
                    className={`mt-auto w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-300
                    ${product.StockQty > 0
                            ? "bg-gradient-to-r from-amber-800 to-indigo-500 hover:cursor-grab hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:scale-105"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                    disabled={product.StockQty === 0}
                >
                    {product.StockQty > 0 ? "Add to Cart" : "Out of Stock"}
                </button>


            </div>



        </div>
    );
};

export default ProductCard;
