import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import { GlobalContext } from "../../components/context/GlobalContext";
import CreateArticle from "../articles/CreateArticle";
import CreateLocation from "../locations/CreateLocation";
import CreateCategory from "../categories/CreateCategory";
import TableArticle from "../articles/TableArticle";
import { useNavigate } from "react-router-dom";
import TableLocation from "../locations/TableLocation";

function Dashboard() {
  const { user } = useContext(GlobalContext);

  const [currentAdmin, setCurrentAdmin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role_id !== 2) navigate("/");
  }, [user]);

  return (
    <Container maxWidth="100%">
      {user && user.role_id === 2 && (
        <Grid container sx={{ mt: 8 }}>
          <Grid
            item
            xs={2}
            sx={{
              // position: "fixed",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h3" variant="h6" sx={{ mb: 5 }}>
              Création
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setCurrentAdmin("article");
              }}
              sx={{ mt: 2 }}
            >
              Ajouter un article
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setCurrentAdmin("location");
              }}
              sx={{ mt: 2 }}
            >
              Ajouter un lieu
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setCurrentAdmin("categorie");
              }}
              sx={{ mt: 2 }}
            >
              Ajouter une catégorie
            </Button>
            <Typography component="h3" variant="h6" sx={{ my: 5 }}>
              Administration
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setCurrentAdmin("listArticles");
              }}
              sx={{ mt: 2 }}
            >
              Liste des articles
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setCurrentAdmin("listLocations");
              }}
              sx={{ mt: 2 }}
            >
              Liste des lieux
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setCurrentAdmin("listCatgories");
              }}
              sx={{ mt: 2 }}
            >
              Liste des catégories
            </Button>
          </Grid>
          <Grid item xs={8} sx={{ ml: 10 }}>
            {currentAdmin === "article" && <CreateArticle />}
            {currentAdmin === "location" && <CreateLocation />}
            {currentAdmin === "categorie" && <CreateCategory />}
            {currentAdmin === "listArticles" && <TableArticle />}
            {currentAdmin === "listLocations" && <TableLocation />}
            {/*     {currentAdmin === "listCategories" && <TableCategories} */}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Dashboard;
