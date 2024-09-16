import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function Privete({children}){
    const {signed, loading} = useContext(AuthContext)

    if(!signed){
        return <Navigate to="/register"></Navigate>
    }

    if(loading){
        return(
            <div></div>
        )
    }


    return children

    
}