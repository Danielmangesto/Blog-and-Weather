import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLogin = async () => {
      const response = await fetch("http://127.0.0.1:5000/GetUserProfile", {
        credentials: "include",
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data.username);
        }
    };

    checkUserLogin();
  }, [navigate]);

  const handleLogout = async () => {
    const response = await fetch("http://127.0.0.1:5000/Logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      setUser(null);
      navigate("/Login");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to={"/"}>
              Home
            </Button>
            <Button color="inherit" component={Link} to={"/AboutMe"}>
              About me
            </Button>
            <Button color="inherit" component={Link} to={"/NewPost"}>
              New Post
            </Button>
          </Typography>
          {user ? (
            <>
              <Button color="inherit" component={Link} to={"/Account"}>
                {user}
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to={"/Login"}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
