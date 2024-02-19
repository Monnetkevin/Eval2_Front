import React, { useContext } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API_ROUTE } from "../../utils/RouteApi";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

function ArticleForm() {
  const { articles, setArticles } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const addArticle = async (data) => {
    try {
      await axios
        .post(API_ROUTE.ADDARTICLE, data, {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          const updateArticle = articles.map((art) =>
            art.id === res.data.data.id ? res.data.data : art
          );
          setArticles(updateArticle);

          navigate(`/article/`);
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
        });
    } catch {
      toast.error("Erreur dans l'ajout de l'article", {
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
  console.log(articles);
  return (
    <Box component="form" onSubmit={handleSubmit(addArticle)} sx={{ mt: 5 }}>
      <TextField
        {...register("article_name", {
          required: "Nom de l'article obligatoire",
        })}
        margin="normal"
        fullWidth
        label="Nom de l'article"
        autoComplete="article_name"
        autoFocus
      />
      <TextField
        {...register("article_content", {
          required: "Description obligatoire",
        })}
        multiline
        label="Description"
        fullWidth
        rows={10}
        variant="outlined"
      />{" "}
      <FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2, width: 100 }}>
          Créer
        </Button>
      </FormControl>
    </Box>
  );
}

export default ArticleForm;
