import { AppBar, Button, Toolbar, Typography, Box, Link } from "@mui/material";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

export default function Navbar(props: any) {

  const {isAuthenticated, setUserData } = props;

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" variant="outlined" sx={{backgroundColor: "#003568"}}>
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
            <Link href="/" underline="none" color="inherit">Refero</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, }}>
             <Link href="/dashboard" underline="none" color="inherit">Dashboard</Link>
          </Typography>
          { isAuthenticated ? <SignOutButton/> : <SignInButton setUserData={setUserData}/> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}