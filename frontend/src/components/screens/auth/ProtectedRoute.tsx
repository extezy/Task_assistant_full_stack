import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const [isAuthenticated, setAuthenticated] = useState(() => {
        try {
            const token = localStorage.getItem("memo-assistant")
            if (token) {
                return true
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    })

    if  (!isAuthenticated){
        return <Navigate to="/auth" state={{from: location}}/>
    }

    return children
}

export default ProtectedRoute