import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 flex flex-col ">
      <NavBar />
      <main className="w-full px-10 pt-24 pb-32 min-h-screen">{children}</main>
      <div className="-mt-16 pb-4 ">
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
