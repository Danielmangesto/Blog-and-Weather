import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const [user, setUser] = useState(null);
  const [isloggedout, setisloggedout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const checkUserLogin = async () => {
        const response = await fetch("/GetUserProfile", {
          credentials: "include",
        });
        if (response.status === 200) {
          const data = await response.json();
          setUser(data.username);
        }
        if (response.status === 401) {
          setUser(null);
        }

      };
      checkUserLogin();
    }
  }, [user]);

  const handleLogout = async () => {
    const response = await fetch("/Logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.status === 200 || response.status === 401) {
      setUser(null);
      refresh()
      navigate("/Login");
    }
  };

   const refresh = () => window.location.reload(true)
  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Button color="inherit"  component={Link} to={"/AboutMe"}>
            About me
          </Button>
          <Button color="inherit"  component={Link} to={"/NewPost"}>
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
    </Box>
  );
}
