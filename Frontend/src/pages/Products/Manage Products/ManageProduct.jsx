import { Link } from "react-router-dom";

const ManageProduct = ({ product }) => {
    return (
        <tr className="hover:bg-gray-50 transition">
            <td className="p-3 border text-gray-600">{product.Id}</td>
            <td className="p-3 border font-medium">{product.Name}</td>
            <td className="p-3 border text-gray-500">{product.StockQty} units</td>
            <td className="p-3 border text-gray-500">Tk {product.Price}</td>
            <td className="p-3 border text-red-500 font-semibold">
                {product.Discount}%
            </td>
            <td className="p-3 border text-green-600 font-semibold">
                Tk {product.Price - product.Price * (product.Discount / 100)}
            </td>
            <td className="p-3 border text-center space-x-2">
                <Link 
                className="btn btn-info"
                to="">
                    Edit
                </Link>
                <button className="btn btn-error">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ManageProduct;