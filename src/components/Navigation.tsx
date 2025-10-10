// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import colors from "../components/colors";

// const Navigation = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Portfolio", path: "/portfolio" },
//     { name: "Services", path: "/services" },
//     { name: "Blog", path: "/blog" },
//     { name: "About", path: "/about" },
//     { name: "Careers", path: "/careers" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo + Text */}
//           <Link to="/" className="flex items-center space-x-2">
//             <img
//               src="src/components/logo final-01.svg" // <-- Adjust this path as needed!
//               alt="Panabotics logo"
//               // className="h-14 w-auto max-h-14 sm:h-16"
//               className="h-24 sm:h-28 md:h-40 w-auto"
//               // or use this for large "h-24 sm:h-28 md:h-40 w-auto"
//               /* h-14 (56px) on mobile, sm:h-16 (64px) on small+ screens for responsiveness */
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className="relative px-3 py-2 text-sm font-medium transition-colors duration-200"
//                   style={{
//                     color: isActive ? colors.primaryHex : colors.secondaryHex,
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.color = colors.primaryHex;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.color = isActive
//                       ? colors.primaryHex
//                       : colors.secondaryHex;
//                   }}
//                 >
//                   {item.name}
//                   {isActive && (
//                     <div
//                       className="absolute bottom-0 left-0 w-full h-0.5"
//                       style={{
//                         backgroundColor: colors.primaryHex,
//                         animation: "scale-in 0.3s ease forwards",
//                       }}
//                     />
//                   )}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* CTA Button */}
//           <div className="hidden md:block">
//             <Link
//               to="/contact"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="block w-full max-w-[140px] text-center bg-primaryHex text-white px-3 py-2 rounded-md font-medium shadow-lg transition-transform duration-300 hover:scale-105 hover:opacity-90"
//               style={{ backgroundColor: colors.primaryHex }}
//             >
//               Get Started
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className={`transition-colors ${
//                 isMobileMenuOpen
//                   ? "text-primary"
//                   : "text-secondary hover:text-primary"
//               }`}
//               style={{
//                 color: isMobileMenuOpen
//                   ? colors.primaryHex
//                   : colors.secondaryHex,
//               }}
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMobileMenuOpen && (
//           <div
//             className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 animate-fade-in"
//             style={{ borderColor: colors.secondaryHex }}
//           >
//             <div className="px-4 pt-3 pb-6 space-y-1">
//               {navItems.map((item) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.path}
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     style={{
//                       color: isActive ? colors.primaryHex : colors.secondaryHex,
//                       backgroundColor: isActive
//                         ? `rgba(${colors.primaryRgb},0.1)`
//                         : "transparent",
//                     }}
//                     className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:text-white hover:bg-[rgba(0,180,187,0.2)]"
//                   >
//                     {item.name}
//                   </Link>
//                 );
//               })}
//               <Link
//                 to="/contact"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 style={{ backgroundColor: colors.primaryHex }}
//                 className="block w-full text-center text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:opacity-90"
//               >
//                 Get Started
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;




import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import colors from "../components/colors";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="src/components/logo final-01.svg"
              alt="Panabotics logo"
              className="h-24 sm:h-28 md:h-40 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-black"
                  }`}
                  style={{
                    color: isActive ? colors.primaryHex : "black",
                  }}
                >
                  {item.name}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 w-full h-0.5"
                      style={{
                        backgroundColor: colors.primaryHex,
                        animation: "scale-in 0.3s ease forwards",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full max-w-[140px] text-center text-white px-3 py-2 rounded-md font-medium shadow-lg transition-transform duration-300 hover:scale-105 hover:opacity-90"
              style={{ backgroundColor: colors.primaryHex }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: "black" }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-black"
                    }`}
                    style={{
                      color: isActive ? colors.primaryHex : "black",
                      backgroundColor: isActive
                        ? `rgba(${colors.primaryRgb},0.1)`
                        : "transparent",
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ backgroundColor: colors.primaryHex }}
                className="block w-full text-center text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:opacity-90"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
