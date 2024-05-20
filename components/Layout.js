import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 flex flex-col">
      <NavBar />
      <main className="max-w-7xl px-6 pt-24 mb-16 md:mb-6 pb-32 min-h-screen">
        {children}
      </main>
      <div className="-mt-32">
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
