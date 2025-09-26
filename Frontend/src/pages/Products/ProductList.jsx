import { useEffect, useState } from "react";
import CategorySection from "../../components/CategorySection"


const ProductList = () => {

    const [products, setProducts] = useState([]);

    const loadData = () => {
        fetch("https://localhost:44381/api/product/all")
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    const handleSearchProduct = (e) => {
        e.preventDefault();
        const text = e.target.searchText.value;
        fetch(`https://localhost:44381/api/product/search/${text}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }
    

    useEffect(loadData, [])

    return (

        <div className="p-6 container mx-auto" >

            <div className="text-center">
                <form onSubmit={handleSearchProduct} action="">
                    <input type="search" name="searchText" placeholder="Search..." className="input input-neutral" />
                    <input type="submit" className="btn btn-accent" value="Search" name="" id="" />
                    <button onClick={loadData} className="btn btn-info ml-2">Refresh</button>
                </form>

            </div>
            {products.map((category) => (
                <CategorySection key={category.CategoryName} category={category} />
            ))}
        </div>

    );
};

export default ProductList;