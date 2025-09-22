
// import { useContext } from "react";
import ProductCard from "./ProductCard";
import CartContext from "../context/CartContext";
// import CartModal from "./CartModal";

const CategorySection = ({ category }) => {

    // const { showModal } = useContext(CartContext);

    return (
        <div className="container mx-auto my-12 px-4">
            {/* Category Header */}
            <div className="mb-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-2">
                    {category.CategoryName}
                </h2>
                <p className="text-amber-100 text-sm sm:text-base">
                    Explore our wide range of <span className="font-bold">{category.CategoryName.toLowerCase()}</span> products
                </p>
                <div className="mt-4 w-24 h-1 mx-auto bg-blue-600 rounded-full"></div>
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
