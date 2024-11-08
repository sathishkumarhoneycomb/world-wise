import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";



function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth();
    
    const navigate  = useNavigate();

    useEffect(() => {
        if(!isAuthenticated)  {
            return navigate('/login')
        }
    },[isAuthenticated, navigate])


    return <>
        {
            isAuthenticated && children
        }
    </>;
}


export default ProtectedRoute;
