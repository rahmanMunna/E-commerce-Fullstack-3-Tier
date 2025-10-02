import { Lock } from "lucide-react"; // icon library (lucide-react)

const UnAuthorized = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Lock className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.  
          Please contact your administrator or log in with the correct role.
        </p>
        <a
          href="/login"
          className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default UnAuthorized;
