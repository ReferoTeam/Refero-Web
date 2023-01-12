import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';

export default function Navbar() {

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
          <Button variant="outlined" endIcon={<LoginIcon/>} color="inherit" size="small" sx={{
            backgroundColor: 'white',
            color: 'primary.main'
          }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}