import ProductCard from "./ProductCard";

const CategorySection = ({ category }) => {
    return (
        <div className="container mx-auto my-12 px-4">
            {/* Category Header */}
            <div className="mb-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                    {category.CategoryName}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base">
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
