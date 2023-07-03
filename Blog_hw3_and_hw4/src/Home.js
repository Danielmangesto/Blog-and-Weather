import React, {useState} from 'react';
import Blog from "./Blog";
import Toolbar from './Toolbar'
import { Stack, Card, Typography, useScrollTrigger, CssBaseline, AppBar, Container } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from "@mui/material/Box";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function ElevateAppBar(props) {
  const { user, handleLogout } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar user={user} handleLogout={handleLogout} />
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Box sx={{ my: 1 }} alignItems="center" justifyContent="center">
          <Blog />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    setUser(null);
  };

  return (
    <div>
      <ElevateAppBar user={user} handleLogout={handleLogout} />
    </div>
  );
}
