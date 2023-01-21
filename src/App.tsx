import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Outlet, Route, BrowserRouter, Routes } from 'react-router-dom'
import { useIsAuthenticated, useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import { loginRequest } from './authconfig';
import { callMsGraph } from './graph';
import { Button } from '@mui/material';



function App() {
  const isAuthenticated: Boolean = useIsAuthenticated();
  const [userData, setUserData] = useState();

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} setUserData={setUserData}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={
          <div>
            <AuthenticatedTemplate>
              <Dashboard />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <div>not auth</div>
            </UnauthenticatedTemplate>
          </div>
        } />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

    /* <div className="App">
      <Navbar isAuthenticated={isAuthenticated}/>
      <div id="dashboard">
        <Outlet />
      </div>
    </div> */