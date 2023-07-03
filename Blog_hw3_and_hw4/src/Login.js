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
    username: "",
    password: ""
  });

  const [validationError, setValidationError] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const sessionKey = getSessionIdFromCookie();
    if (sessionKey) {
      navigate('/Account');
    }
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

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const url = "/Login";
    const data = {
      user: postData.username,
      pass: postData.password
    };

    axios.post(url, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          refresh();
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

  const validateInputs = () => {
    let isValid = true;

    if (postData.username.trim() === "") {
      setValidationError((prevState) => ({
        ...prevState,
        username: "Username is required"
      }));
      isValid = false;
    } else {
      setValidationError((prevState) => ({
        ...prevState,
        username: ""
      }));
    }

    if (postData.password.trim() === "") {
      setValidationError((prevState) => ({
        ...prevState,
        password: "Password is required"
      }));
      isValid = false;
    } else {
      setValidationError((prevState) => ({
        ...prevState,
        password: ""
      }));
    }

    return isValid;
  };

  const refresh = () => window.location.reload(true);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
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
              error={Boolean(validationError.username)}
              helperText={validationError.username}
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
              error={Boolean(validationError.password)}
              helperText={validationError.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              onClick={handleLogin}
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
