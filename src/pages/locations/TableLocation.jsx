import React, { useContext } from "react";
import { Container, Box, Typography } from "@mui/material";
import { GlobalContext } from "../../components/context/GlobalContext";
import ListTableLocation from "../../components/locations/ListTableLocation";

function TableLocation() {
  const { user } = useContext(GlobalContext);
  return (
    <Container component="main">
      {user.role_id === 2 && (
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h5">
            Voici la liste des lieux existants
          </Typography>
          <ListTableLocation />
        </Box>
      )}
    </Container>
  );
}

export default TableLocation;
