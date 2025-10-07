import { useEffect, useState } from "react";
import CategorySection from "../../components/CategorySection"
import api from "../../Interceptor/Api";
import CartContext from "../../context/CartContext";


const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);



    function callAPI(url) {
        api.get(url)
            .then(res => {
                if (res.status === 200) {
                    setProducts(res.data)
                    setLoading(false)
                    return
                }
                alert("Unauthorized action")
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    const loadData = () => {
        document.getElementById("search").value = "";
        const url = "product/all";
        callAPI(url);
    }

    const handleSearchProduct = (e) => {
        e.preventDefault();
        const text = e.target.searchText.value;
        const url = `product/search/${text}`;
        callAPI(url);
    }


    useEffect(loadData, [])

    return (

        <div className="p-6 container mx-auto">
            <div className="text-center">
                <form onSubmit={handleSearchProduct}>
                    <input
                        id="search"
                        type="search"
                        name="searchText"
                        placeholder="Search..."
                        className="input input-neutral relative border-2"
                    />
                    <button onClick={loadData} type="button" className="btn btn-error">
                        X
                    </button>
                    <input type="submit" className="btn btn-accent" value="Search" />
                </form>
            </div>
            {
                loading ? (
                    <h1>Loading...</h1>
                ) : (

                    products.length > 0 ? (
                        <div>
                            {products.map((category) => (
                                <CategorySection key={category.CategoryName} category={category} />
                            ))}
                        </div>
                    ) : (
                        <h1>No products available</h1>
                    )
                )
            }
        </div>


    );
};

export default ProductList;