import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionKey = getSessionIdFromCookie();
    if (sessionKey) {
      fetchUserProfile(sessionKey);
    }
  }, []);

  const getSessionIdFromCookie = () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)session_id\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  };

  const fetchUserProfile = async (sessionKey) => {
    try {
      const response = await fetch('/GetUserProfile', {
        headers: {
          Authorization: `Bearer ${sessionKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    navigate('/Login'); // Redirect to the login page
  };

  return (
    <div>
      {userData ? (
        <Box>
          <Typography variant="h4">Username: {userData.username}</Typography>
          <Typography variant="h4">Role: {userData.role}</Typography>
          <Typography variant="h4">Country: {userData.country}</Typography>
          <Button component={Link} to="/Account" variant="contained" sx={{ mt: 2 }}>
            Account
          </Button>
          <Button onClick={handleLogout} variant="contained" sx={{ mt: 2 }}>
            Logout
          </Button>
        </Box>
      ) : (
        <Typography variant="h4">Loading user data...</Typography>
      )}
    </div>
  );
}
