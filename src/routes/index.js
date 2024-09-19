import { Routes, Route } from "react-router-dom";
import SingIn from "../pages/SingIn";
import SingUp from "../pages/SingIn/SingUp";
import Dashboard from "../pages/SingIn/Dashboard";
import Privete from "./Privete";
import Profile from "../pages/SingIn/Profile";
import Customers from "../pages/SingIn/Customers";

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<SingIn></SingIn>}></Route>
            <Route path="/register" element={<SingUp></SingUp>}></Route>
            <Route path="/dashboard" element={<Privete> <Dashboard></Dashboard> </Privete>}></Route>
            <Route path="/profile" element={<Privete> <Profile></Profile> </Privete>}></Route>
            <Route path="/customers" element={<Privete> <Customers> </Customers></Privete>}></Route>
            <Route path="/new" element={<Privete> <New></New> </Privete>}></Route>
        </Routes>
    )

}


export default RoutesApp
