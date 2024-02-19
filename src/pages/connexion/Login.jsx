import React from "react";
import { Box, Container, Typography } from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>

        <LoginForm />
      </Box>
    </Container>
  );
}

export default Login;
