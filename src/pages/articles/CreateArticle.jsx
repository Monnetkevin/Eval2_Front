import { Container, Box, Typography } from "@mui/material";
import React from "react";
import ArticleForm from "../../components/article/ArticleForm";

function CreateArticle() {
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
          Créer un nouvelle article
        </Typography>
        <ArticleForm />
      </Box>
    </Container>
  );
}

export default CreateArticle;
