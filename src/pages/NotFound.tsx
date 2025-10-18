import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">404</h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 sm:mb-8">Oops! Page not found</p>
        <a href="/" className="inline-block text-blue-500 hover:text-blue-700 underline text-base sm:text-lg">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
