import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import User from "../components/User";

function AppLayout() {

  const navigate = useNavigate();
  const {isAuthenticated } = useAuth();

  useEffect(() => {

    if(isAuthenticated === false) navigate('/login')
  },[isAuthenticated, navigate])



  return (
    <>
      <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
     
        
      </div>
    </>
  );
}

export default AppLayout;
