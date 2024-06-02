import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 flex flex-col pb-2 sm:pb-0">
      <NavBar />
      <main className="w-full px-10 pt-24 mb-2 md:mb-6 pb-32 min-h-screen">
        {children}
      </main>
      <div className=" sm:-mt-16 pb-4 ">
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
