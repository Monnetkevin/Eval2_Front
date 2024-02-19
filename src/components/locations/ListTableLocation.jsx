import React, { useContext, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import { API_ROUTE } from "../../utils/RouteApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";

function ListTableLocation() {
  const { locations, setLocations } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const deleteLocation = (id) => {
    try {
      const res = axios
        .delete(API_ROUTE.LOCATION + `${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          setLocations((prev) => prev.filter((item) => item.id !== id));
        });
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggablePercent: 60,
        progress: undefined,
        theme: "light",
      });
    } catch {
      toast.error("Erreur dans la suppression du lieux", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggablePercent: 60,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Container>
      {locations.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700, mt: 5 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Nom</TableCell>
                <TableCell align="right">Déscription</TableCell>
                <TableCell align="right">Adresse</TableCell>
                <TableCell align="right">Code Postal</TableCell>
                <TableCell align="right">Ville</TableCell>
                <TableCell align="right">Latitude et longitude</TableCell>
                <TableCell align="right">Catégorie</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell component="th" scope="row">
                    {location.id}
                  </TableCell>
                  <TableCell align="right">{location.location_name}</TableCell>
                  <TableCell align="right">
                    {location.location_content}
                  </TableCell>
                  <TableCell align="right">
                    {location.location_adress}
                  </TableCell>
                  <TableCell align="right">
                    {location.location_postal}
                  </TableCell>
                  <TableCell align="right">{location.location_city}</TableCell>
                  <TableCell align="right">
                    {location.location_lat}, {location.location_lng}
                  </TableCell>
                  <TableCell align="right">
                    {location.category.category_name}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      ml: 5,
                    }}
                  >
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteLocation(location.id);
                      }}
                    />
                    <EditIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpen(true);
                      }}
                    />
                    {/* {open === true && (
                      <ModalArticle
                        article={selectedArticle}
                        setArticle={setSelectedArticle}
                        open={open}
                        setOpen={setOpen}
                      />
                    )} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Pas d'article</Typography>
      )}
    </Container>
  );
}

export default ListTableLocation;
