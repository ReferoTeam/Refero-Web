import { AppBar, Button, Toolbar, Typography, Box, Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

export default function Navbar(props: any) {

  const {isAuthenticated} = props;

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor: "#003568"}}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: 'left',
              fontFamily: 'serif',
              fontSize: 30,
              flexGrow: 1
            }}
          >
            <Link component={RouterLink} to="/" underline="none" color="inherit">Refero</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, }}>
             <Link component={RouterLink} to="/dashboard" underline="none" color="inherit">Dashboard</Link>
          </Typography>
          { isAuthenticated ? <SignOutButton/> : <SignInButton/> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}