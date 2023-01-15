import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType: String) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/" // redirects the top level app after logout
            });
        }
    }

    return (
      <Button variant="outlined" endIcon={<LoginIcon/>} color="inherit" size="small" sx={{
            backgroundColor: 'white',
            color: 'primary.main'
          }}
          onClick={() => handleLogout("popup")}
          >Sign Out</Button>
      );
}