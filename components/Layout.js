import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className=" px-4 md:px-8">
      <main className="min-h-[1000px] max-w-7xl mx-auto mb-20">
        <NavBar />
        {/* content */}
        <main> {children} </main>
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
