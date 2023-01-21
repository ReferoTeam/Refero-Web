import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authconfig";
import { Button, SvgIcon } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { callMsGraph } from '../graph';
import { redirect } from "react-router";
import { useUserContext } from "../contexts/UserContext";

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance, accounts } = useMsal();
  const { setUserData } = useUserContext();

  async function handleLogin (loginType: String) {
    if (loginType === "redirect") {
      instance.loginPopup(loginRequest)
      .then((loginResponse) => fetchProfileData(loginResponse))
      .then(() => redirect('http://localhost:3000/dashboard'))
      .catch(e => {
          console.log(e);
      });
    }
  }

  function fetchProfileData(loginRequest: any) {
    const request = {
      account: accounts[0],
      ...loginRequest
    };
    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(request).then((response) => {
        callMsGraph(response.accessToken).then((graphData) =>  {
          if(typeof graphData != "undefined") {
            fetch('http://localhost:8000/users/' + graphData.id)
            .then((res: Response) => res.json())
            .then((json) => setUserData(json))
            .catch(e => console.log(e));
          }
        })
    }).catch((e) => {
      console.log(e);
      instance.acquireTokenPopup(request).then((response) => {
        callMsGraph(response.accessToken).then((graphData) => {
          if(typeof graphData != "undefined") {
            fetch('http://localhost:8000/users/' + graphData.id)
            .then((res: Response) => res.json())
            .then((json) => setUserData(json))
            .catch(e => console.log(e));
          }
        });
      });
    });
}

  return (
      <Button size="small" endIcon={<AccountCircleIcon/>} sx={{
          backgroundColor: 'white',
          color: '#5E5E5E',
          font: 'Segoe UI',
          fontWeight: 600,
          background: '#FFFFFF',
          border: '1px',
          ":hover": {
            background: '#F1F1F1'
          }
          
        }}
        onClick={() => handleLogin("redirect")}
        >Sign in with Microsoft</Button>
  );
}