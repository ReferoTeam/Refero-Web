import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { useState } from 'react'

export default function Navbar({isAuthenticated}: {isAuthenticated: Boolean}) {

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" variant="outlined">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
            }}
          >
            Refero
          </Typography>
          { isAuthenticated ? <SignOutButton/> : <SignInButton /> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}