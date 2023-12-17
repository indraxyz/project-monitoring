import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <NavBar />
      <main className="min-h-[900px] max-w-7xl mx-auto px-4 md:px-6 mb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
