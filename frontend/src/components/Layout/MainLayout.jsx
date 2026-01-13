import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx"

function MainLayout(){
    return(
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}

export default MainLayout;
