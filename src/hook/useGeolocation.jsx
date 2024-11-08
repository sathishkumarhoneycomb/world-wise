import { useState, useEffect } from "react";


const useGeolocation = () => {
    // creating custom hooks 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [position, setPosition] = useState([]);


    function success(pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng])
        setLoading(false);
       
    }

    
    function failure(err) {
        setError(true);
        setLoading(false);
    }


    function getPosition() {
        if(!navigator.geolocation) {
            setError(true);
            return;
        }
        setLoading(true);
        
        navigator.geolocation.getCurrentPosition(success, failure);
    }
 

     

    return {getPosition, position, loading,error};
}

export default useGeolocation;
