import React from 'react';

const AdminNavbar = () => {

    

    return (
        <div>
            {/* Navbar */}
            <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center shadow-md">
                {/* Left: Branding */}
                <h1 className="text-white text-xl font-bold">E-Com</h1>

                {/* Right: Actions */}
                <div className="flex items-center gap-6 text-white">
                    <button className="hover:text-gray-200">🔔 Notifications</button>
                    <button className="hover:text-gray-200">⚙️ Settings</button>
                    
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;