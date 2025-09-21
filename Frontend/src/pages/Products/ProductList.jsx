import { useEffect, useState } from "react";
import CategorySection from "../../components/CategorySection"

const ProductList = () => {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch("https://localhost:44381/api/product/all")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (

        <div className="p-6" >
            <input className="    
            bg-amber-200 p-3 rounded-xl" type="search" name="" id="" placeholder="Search item.." />
            {products.map((category) => (
                <CategorySection key={category.CategoryName} category={category} />
            ))}
        </div>

    );
};

export default ProductList;