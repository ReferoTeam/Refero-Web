import { Add } from "@mui/icons-material";
import { Box, Container, Link, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'


export default function Footer() {

  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
      bottom: 0,
      width: '100%',
      position: 'fixed'
    }} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: 'serif',
              fontSize: 30,
            }}
          >
            <Link component={RouterLink} to="/" underline="none" color="inherit">Refero</Link>
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright ©2022. [] Limited
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}