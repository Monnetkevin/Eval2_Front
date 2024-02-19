import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  FormControlLabel,
  Button,
  Grid,
  Checkbox,
  Link,
} from "@mui/material";
import { API_ROUTE } from "../../utils/RouteApi";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";

function LoginForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { setToken } = useContext(GlobalContext);

  const login = async (data) => {
    try {
      const res = await axios.post(API_ROUTE.LOGIN, data);
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access_token.token);
        setToken(localStorage.getItem("access_token"));
        navigate("/");
      }
      toast.success(res.data.meta.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggablePercent: 60,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Connexion échouée", {
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
    <Box component="form" onSubmit={handleSubmit(login)} sx={{ mt: 1 }}>
      <TextField
        {...register("email", { required: "Email obligatoire" })}
        margin="normal"
        fullWidth
        id="email"
        label="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        {...register("password", { required: "Mot de passe obligatoire" })}
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Souvenir de moi"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Se connecter
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Mot de passe oublié?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/inscription" variant="body2">
            {"Inscription"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
