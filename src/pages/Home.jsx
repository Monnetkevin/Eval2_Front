import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import RandomArticleHome from "../components/article/RandomArticleHome";

function Home() {
  return (
    <Box component="div">
      <Grid
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        sx={{ mt: 8 }}
      >
        <Grid item xs={4}>
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              position: "sticky",
            }}
          >
            <Typography component="h1" variant="h3">
              Pépites
            </Typography>
            <Typography component="p" variant="body1">
              Découvrez les plus beaux endroits et les meilleures activités en
              Sarthe.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <RandomArticleHome />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
