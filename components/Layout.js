import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 flex flex-col  min-h-screen">
      <NavBar />
      <main
        className="max-w-7xl px-6 pt-8 mt-20 mb-10"
        style={{
          minHeight: "480px",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
