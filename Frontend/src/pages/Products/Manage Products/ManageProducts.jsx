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
        <div className="space-y-10 p-6 bg-gray-50">
            <h1 className="text-center">Manage Product</h1>
            <div className="text-end ">
                <Link to="addProduct" className="btn btn-neutral">Add</Link>
            </div>
            {
                products.length > 0 &&
                products.map((product, idx) => (
                    <div key={idx} className="bg-white shadow-md rounded-2xl p-6">
                        {/* Category Header */}
                        <h1 className="text-2xl text-center bg-blue-50 py-4 font-semibold text-gray-800 border-b pb-3 mb-4">
                            {product.CategoryName}
                        </h1>

                        {/* Product Table */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-left text-gray-700 text-sm uppercase">
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
            }
        </div>


    );
};

export default ManageProducts;