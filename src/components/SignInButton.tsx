import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authconfig";
import { Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType: String) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    return (
        <Button variant="outlined" endIcon={<LoginIcon/>} color="inherit" size="small" sx={{
            backgroundColor: 'white',
            color: 'primary.main'
          }}
          onClick={() => handleLogin("popup")}
          >Login</Button>
    );
}