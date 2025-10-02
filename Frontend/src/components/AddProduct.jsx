import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../Interceptor/Api';

const AddProduct = () => {

    const [categories, setCategories] = useState([]);

    const priceRef = useRef(0);
    const discountRef = useRef(0);
    const currentPriceRef = useRef(0);


    const loadData = () => {
        const url = "category/all";
        api.get(url)
        .then(res =>{
            if(res.status !== 200){
                alert("Unauthorized Action");
                return;
            }
            setCategories(res.data);
        })
    }
    useEffect(loadData, []);


    async function addProduct(product) {
        let res = await fetch("https://localhost:44381/api/product/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(product)
        });
        let data = res.json();
        console.log(data)
        if(data){
            toast.success("Product added successfully");
        }

    }


    const CalculateCurrentPrice = () => {
        const price = parseFloat(priceRef.current?.value) || 0;
        const discount = parseFloat(discountRef.current?.value) || 0;

        const validDiscount = Math.min(Math.max(discount, 0), 100);

        const calculatedPrice = price - (price * validDiscount / 100);

        if (currentPriceRef.current) {
            currentPriceRef.current.value = calculatedPrice.toFixed(2);
        }


    };


    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.Name.value;
        const qty = form.StockQty.value;
        const price = form.Price.value;
        const discount = form.Discount.value;
        const categoryId = form.Category.value;

        const product = {
            Name: name,
            StockQty: qty,
            Price: price,
            Discount: discount,
            CategoryId: categoryId
        }

        console.log(product)

        if (isValidInput(product)) {
            addProduct(product);

            form.reset();

        }
        else {
            alert("Invalid")

        }
    }

    const isValidInput = (product) => {
        // Trim and check empty string
        if (!product.Name || product.Name.trim() === "" || product.CategoryId === "") return false;

        // Convert to numbers safely
        const stockQty = Number(product.StockQty);
        const price = Number(product.Price);
        const discount = Number(product.Discount);

        // Check for NaN (invalid input)
        if (isNaN(stockQty) || isNaN(price) || isNaN(discount)) return false;

        // Business rules
        if (stockQty < 0 || price < 0) return false;
        if (discount < 0 || discount > 100) return false;

        return true;
    };




    return (
        <div>
            <form
                onSubmit={handleAddProduct}
                action=""
                method="post"
                className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
            >
                <h2 className="text-2xl text-center font-semibold text-gray-800 border-b pb-3">
                    Add Product
                </h2>

                {/* Form fields in grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="Name"
                            id="Name"
                            placeholder="Enter product name"
                            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Stock Quantity */}
                    <div>
                        <label htmlFor="StockQty" className="block text-sm font-medium text-gray-700">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="StockQty"
                            id="StockQty"
                            placeholder="e.g. 100"
                            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="Price" className="block text-sm font-medium text-gray-700">
                            Original Price (Tk)
                        </label>
                        <input
                            onKeyUp={CalculateCurrentPrice}
                            ref={priceRef}
                            type="number"
                            name="Price"
                            id="Price"
                            placeholder="e.g. 500"
                            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Discount */}
                    <div>
                        <label htmlFor="Discount" className="block text-sm font-medium text-gray-700">
                            Discount (%)
                        </label>
                        <input
                            onKeyUp={CalculateCurrentPrice}
                            ref={discountRef}
                            type="number"
                            name="Discount"
                            id="Discount"
                            placeholder="e.g. 10"
                            className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Categories*/}
                    <div className="w-full max-w-sm">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Category
                        </label>
                        <select
                            id="Category"
                            name="Category"
                            className="block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option disabled selected value="">-- Select a Category --</option>
                            {categories.map((category, idx) => (
                                <option key={idx} value={category.Id}>
                                    {category.Name}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Current Price (calculated) */}
                    <div className="">
                        <label htmlFor="CurrentPrice" className="block text-sm font-medium text-gray-700">
                            Current Price (Auto Calculated)
                        </label>
                        <input
                            ref={currentPriceRef}

                            type="text"
                            name="CurrentPrice"
                            id="CurrentPrice"
                            disabled
                            className="mt-1 block w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                        />
                    </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-center">
                    <input
                        type="submit"
                        value="Submit"
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    />
                </div>
            </form>

        </div>
    );
};

export default AddProduct;