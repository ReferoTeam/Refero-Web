import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Navbar from '../components/Navbar';
import Dashboard from './dashboard';
import { Outlet } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react';


function App() {
  const isAuthenticated: Boolean = useIsAuthenticated();
  console.log(isAuthenticated);

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated}/>
      <div id="dashboard">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
