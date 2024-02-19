import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { API_ROUTE } from "../../utils/RouteApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const registerSubmit = async (data) => {
    try {
      const res = await axios.post(API_ROUTE.REGISTER, data);
      navigate("/connexion");
      toast.success(res.data.meta.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return res.data;
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(registerSubmit)}
      sx={{ mt: 2 }}
    >
      <TextField
        {...register("name", { required: "Nom obligatoire", min: 3 })}
        margin="normal"
        fullWidth
        label="Nom"
        autoComplete="nom"
        autoFocus
      />
      <TextField
        {...register("email", { required: "Email obligatoire et unique" })}
        margin="normal"
        label="Email"
        type="email"
        fullWidth
        autoComplete="email"
        autoFocus
      />
      <TextField
        {...register("password", {
          required: "Mot de passe obligatoire",
          min: 6,
        })}
        margin="normal"
        label="password"
        type="password"
        fullWidth
        autoComplete="email"
        autoFocus
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        S'inscrire
      </Button>
    </Box>
  );
}

export default RegisterForm;
