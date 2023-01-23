import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import { User } from './types';
import { UserContext } from './contexts/UserContext';
import Footer from './components/Footer';



function App() {
  const isAuthenticated: Boolean = useIsAuthenticated();
  const [userData, setUserData] = useState<User>({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    interests: [''],
    attendingEvents: ['']
  });

  useEffect(() => {
    console.log(userData);
  }, [userData])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Navbar isAuthenticated={isAuthenticated}/>
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
        <Footer />
      </UserContext.Provider>

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