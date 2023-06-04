import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  ThemeProvider,
  Typography
} from "@mui/material";

const theme = createTheme();

export default function Login() {
  const [postData, setUserData] = useState({
    data: [],
    resp: null,
    username: null,
    password: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    const sessionKey = getSessionIdFromCookie();
    if (sessionKey) {
      navigate('/Account');
    }

    checkUserProfile();
  }, []);

  const getSessionIdFromCookie = () => {
    const sessionKey = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('session_id='))
      ?.split('=')[1];
    return sessionKey;
  };

  const handleInputChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const doLogin = (e) => {
    e.preventDefault();

    const url = "http://127.0.0.1:5000/Login";
    const data = {
      user: postData.username,
      pass: postData.password
    };

    axios.post(url, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          navigate('/Account');
        } else {
          setUserData((prevData) => ({
            ...prevData,
            resp: "Error!"
          }));
        }
      })
      .catch((err) => {
        setUserData((prevData) => ({
          ...prevData,
          resp: "Error!"
        }));
      });
  };

  const checkUserProfile = () => {
    fetch("http://127.0.0.1:5000/GetUserProfile", {
      credentials: "include"
    })
      .then((response) => {
        if (response.status === 200) {
          navigate('/Account');
        } else {
          setUserData((prevData) => ({
            ...prevData,
            resp: "Error!"
          }));
        }
      })
      .catch((err) => {
        setUserData((prevData) => ({
          ...prevData,
          resp: "Error!"
        }));
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={postData.username}
              onChange={handleInputChange}
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={postData.password}
              onChange={handleInputChange}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              onClick={doLogin}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
