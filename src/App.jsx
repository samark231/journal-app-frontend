import React, { useEffect, useState } from 'react'
import useAuthStore from './store/authStore.js'
import AuthPage from './pages/Authpage.jsx'
import HomePage from './pages/HomePage.jsx'
import {useShallow} from "zustand/react/shallow";
import Loading from './components/Loading.jsx';
import "./styles/app.css";

function App() {
  const {user, checkAuth, isLoading} = useAuthStore(useShallow((state)=>({
      user:state.user,
      checkAuth: state.checkAuth,
      isLoading:state.isLoading
  })))

  useEffect(()=>{
    checkAuth();
  },[]);

  return (
    <>
      {isLoading? 
        <Loading/>
        :
        <>{user? <HomePage/>:<AuthPage/>}</>
      }
    </>
  )
}
export default App;
