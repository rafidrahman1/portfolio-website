import {PropsWithChildren} from "react";
import Navbar from "../components/layout/Header/Navbar";
import Footer from "../components/layout/Footer/Footer";

const Layout = ({ children } : PropsWithChildren) => {
  return (
      <div>
        {children}
      </div>)
}

export default Layout;