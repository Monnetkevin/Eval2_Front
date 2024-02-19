import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import { Container, Box, Typography } from "@mui/material";

function Register() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          Inscription
        </Typography>
        <RegisterForm />
      </Box>
    </Container>
  );
}

export default Register;
