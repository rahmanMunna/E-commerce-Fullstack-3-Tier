
// import { useContext } from "react";
import ProductCard from "./ProductCard";
import CartContext from "../context/CartContext";
// import CartModal from "./CartModal";

const CategorySection = ({ category }) => {

    // const { showModal } = useContext(CartContext);

    return (
        <div className="container mx-auto my-12 px-4">
            {/* Category Header */}
            <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-100 via-white to-blue-50 shadow-lg text-center border border-blue-200">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-2">
                    {category.CategoryName}
                </h2>
                <p className="text-gray-700 text-sm sm:text-base">
                    Explore our wide range of <span className="font-semibold text-blue-600">{category.CategoryName.toLowerCase()}</span> products
                </p>
                <div className="mt-4 w-28 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500"></div>
            </div>


            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {category.Products.map((product) => (
                    <ProductCard key={product.Id} product={product} />
                ))}
            </div>

        </div>
    );
};

export default CategorySection;
