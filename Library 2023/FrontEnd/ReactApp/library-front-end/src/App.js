import React from "react"
import { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthContext from './store/auth-context';
import './assets/css/adminlte.css';
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import AuthorsPage from "./pages/AuthorsPage";
import BookDeatilsPage from "./pages/BookDetailsPage";

require('dotenv').config()


function App() {
  const authCtx = useContext(AuthContext);
  
  function RequireAuth( {children} ) {
    let location = useLocation();
    if (!authCtx.isLoggedIn) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
  }

  return (
      <Layout>
        <Routes>
          <Route path='/login' element={<AuthPage/>}/>
          <Route exact path='/register' element={<RegisterPage/>} />
          <Route exact path='/' element={<RequireAuth><DashboardPage/></RequireAuth>}/>
          <Route exact path='/profile' element={<RequireAuth><RegisterPage/></RequireAuth>} />
          <Route exact path='/authors' element={<RequireAuth><AuthorsPage/></RequireAuth>} />
          <Route exact path='/books' element={<RequireAuth><BookDeatilsPage/></RequireAuth>} />
          <Route path='/dashboard' element={<RequireAuth><DashboardPage/></RequireAuth>}/>
          <Route path='*' element={<RequireAuth><DashboardPage/></RequireAuth>}/>
        </Routes>
      </Layout>
  );
}

export default App;
