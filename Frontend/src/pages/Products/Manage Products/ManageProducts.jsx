import { useEffect, useState } from "react";
import ManageProduct from './ManageProduct'
import { Link } from "react-router-dom";
import api from "../../../Interceptor/Api";

const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const loadData = () => {
        const url = "product/all";
        api.get(url)
            .then(res => {
                if (res.status !== 200) {
                    alert("Unauthorized action")
                    return;
                }
                setProducts(res.data)
            })
    }


    useEffect(loadData, []);

    return (
        <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <h1 className="text-3xl text-center font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Manage Products
            </h1>
            <div className="text-end border-b-2 py-3">
                <Link to="addProduct" className="btn btn-primary px-5 py-2 rounded-md shadow-sm">
                    + Add Product
                </Link>
            </div>
            {/* Product Categories */}
            {products.length > 0 ? (
                products.map((product, idx) => (
                    <div key={idx} className="bg-white shadow-lg rounded-xl p-6 space-y-4">
                        {/* Category Header */}
                        <h2 className="text-xl text-center font-semibold text-gray-700 border-b pb-2">
                            {product.CategoryName}
                        </h2>

                        {/* Product Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                                        <th className="p-3 border">ID</th>
                                        <th className="p-3 border">Name</th>
                                        <th className="p-3 border">Stock</th>
                                        <th className="p-3 border">Original Price</th>
                                        <th className="p-3 border">Discount</th>
                                        <th className="p-3 border">Current Price</th>
                                        <th className="p-3 border text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.Products.map((p, i) => (
                                        <ManageProduct key={i} product={p} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 italic">No products available.</div>
            )}
        </div>


    );
};

export default ManageProducts;