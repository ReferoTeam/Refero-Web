import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType: String) => {
        if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }

    return (
      <Button size="small" endIcon={<AccountCircleIcon/>}  sx={{
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
          onClick={() => handleLogout("redirect")}
          >Sign Out</Button>
      );
}