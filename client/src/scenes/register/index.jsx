import React, { useState } from 'react';
import ModifiedTextfield from "../../component/modifiedTextField";
import CustomizedButtons from '../../component/CustomizedButtons';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function RegisterUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5001/register/", form);
      if(response.status){
        alert('User created successfully');
      }
      setForm({
        name: "",
        email: "",
        password: ""
      });
      navigate("/")
    } catch (error) {
      console.error("Error =>", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register Now
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <ModifiedTextfield
                  label="Name"
                  placeholder="<NAME>"
                  value={form?.name || ""}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
                  options={{ horizontalLabel: true }}
                  required={true}
                />
                <ModifiedTextfield
                  label="Email"
                  placeholder="<NAME>"
                  value={form?.email || ""}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
                  options={{ horizontalLabel: true }}
                  required={true}
                />
                <ModifiedTextfield
                  label="Password"
                  placeholder="<NAME>"
                  value={form?.password || ""}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
                  options={{ horizontalLabel: true }}
                  required={true}
                  type="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Grid container >
                  <Grid item xs={8}>
                    <CustomizedButtons
                      content={"Register"}
                      onClick={handleSubmit}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomizedButtons
                      content={"Cancel"}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/" variant="body2">
                      {"Already have an account? Log in"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  )
}
