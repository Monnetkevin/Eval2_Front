import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { API_ROUTE } from "../../utils/RouteApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LocationForm() {
  const { register, handleSubmit } = useForm();
  const { categories } = useContext(GlobalContext);
  const navigate = useNavigate();

  const addLocation = async (data) => {
    try {
      const res = await axios.post(API_ROUTE.ADDLOCATION, data, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      });
      navigate("/");
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
      toast.error("Erreur dans l'ajout du lieux", {
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
    <Box component="form" onSubmit={handleSubmit(addLocation)} sx={{ mt: 5 }}>
      <TextField
        {...register("location_name")}
        margin="normal"
        label="Nom"
        fullWidth
      />
      <TextField
        {...register("location_content")}
        multiline
        margin="normal"
        label="Description"
        fullWidth
        rows={10}
      />
      <TextField
        {...register("location_address")}
        label="Adresse"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register("location_postal")}
        label="Code postal"
        margin="normal"
        sx={{ mr: 2 }}
      />
      <TextField {...register("location_city")} label="Ville" margin="normal" />
      <Typography
        component="p"
        variant="body2"
        sx={{ mt: 2, textAlign: "center" }}
      >
        Si vous avez la latitude et la longitude du lieux
      </Typography>
      <TextField
        {...register("location_lat")}
        label="Latitude"
        margin="normal"
        sx={{ mr: 2 }}
      />
      <TextField
        {...register("location_lng")}
        label="Longitude"
        margin="normal"
      />
      <FormControl sx={{ mt: 2, width: 200 }}>
        <InputLabel>Categorie</InputLabel>
        <Select
          {...register("category_id")}
          label="Categorie"
          defaultValue=""
          variant="outlined"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.category_name}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" sx={{ my: 2 }}>
          Créer
        </Button>
      </FormControl>
    </Box>
  );
}

export default LocationForm;
