import { useContext, useEffect, useState } from "react";
import CategorySection from "../../components/CategorySection"
import api from "../../Interceptor/Api";
import CartContext from "../../context/CartContext";


const ProductList = () => {

    const [products, setProducts] = useState([]);
    


    function callAPI(url) {
        api.get(url)
            .then(res => {
                res.status === 200 ? setProducts(res.data)
                    : alert("Unauthorized action")
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    const loadData = () => {
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

        <div className="p-6 container mx-auto" >

            <div className="text-center">
                <form onSubmit={handleSearchProduct} action="">
                    <input type="search" name="searchText" placeholder="Search..."
                        className="input input-neutral relative  border-2" />
                    <button onClick={loadData} className="btn btn-error ">X</button>
                    <input type="submit" className="btn btn-accent" value="Search" name="" id="" />
                </form>
                

            </div>
            {
                products.map((category) => (
                    <CategorySection key={category.CategoryName} category={category} />
                ))
            }
        </div>

    );
};

export default ProductList;