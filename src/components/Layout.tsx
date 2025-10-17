import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import AdminLogin from "./AdminLogin";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <AdminLogin />
    </div>
  );
};

export default Layout;
