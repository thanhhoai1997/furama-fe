import Footer from "./Footer";
import Header from "./Header";
import Naviga from "./Naviga";
import { Outlet } from "react-router-dom";

const Layout = () => {


    return(
        <>
        
        <Header/>
        <Naviga/>
        <Outlet />
        <Footer/>   
        
        
        </>
    )


}

export default Layout;