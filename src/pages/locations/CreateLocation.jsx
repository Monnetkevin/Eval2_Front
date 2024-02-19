import React from "react";
import { Container, Box, Typography } from "@mui/material";
import LocationForm from "../../components/locations/LocationForm";

function CreateLocation() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          Tu souhaites ajouter un nouveau lieu
        </Typography>
        <LocationForm />
      </Box>
    </Container>
  );
}

export default CreateLocation;
