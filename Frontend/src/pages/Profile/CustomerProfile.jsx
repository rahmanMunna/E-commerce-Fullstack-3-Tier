import React, { useEffect, useState } from "react";
import api from "../../Interceptor/Api";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No user ID found in localStorage");
      setLoading(false);
      return;
    }

    const url = `customer/user/${userId}`;
    api
      .get(url)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setCustomer(res.data);
        } else {
          console.error("Invalid server response");
        }
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-lg font-semibold text-gray-500">
          Loading profile...
        </h2>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-lg font-semibold text-gray-500">
          No customer data found.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 border-b pb-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
            {customer.Name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {customer.Name}
            </h1>
            <p className="text-gray-500 text-sm">User ID: {customer.UserId}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 className="text-sm text-gray-500 uppercase">Email</h3>
            <p className="font-medium">{customer.Email}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase">Phone</h3>
            <p className="font-medium">{customer.Phone}</p>
          </div>
          
        </div>

        {/* Shipping Address Section */}
        {customer.ShippingAddress && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Shipping Address
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p>
                <span className="font-semibold">City:</span>{" "}
                {customer.ShippingAddress.City}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {customer.ShippingAddress.Location}
              </p>
              <p>
                <span className="font-semibold">Address ID:</span>{" "}
                {customer.ShippingAddress.Id}
              </p>
            </div>
          </div>
        )}

        
        <div className="mt-8 flex justify-end">
          <button className="btn bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
