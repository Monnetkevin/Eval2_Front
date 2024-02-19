import React from "react";
import { Container, Box, Typography } from "@mui/material";

function CreateCategory() {
  return (
    <Container component="main" maxWidth="xl">
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          Tu souhaites ajouter une nouvelle catégorie
        </Typography>
      </Box>
    </Container>
  );
}

export default CreateCategory;
