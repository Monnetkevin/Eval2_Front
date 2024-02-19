import { React, useEffect, useState } from "react";
import {
  Fade,
  Box,
  Typography,
  TextField,
  FilledInput,
  Button,
  Modal,
  Backdrop,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { API_ROUTE } from "../../utils/RouteApi";

import axios from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalArticle({ article, setArticle, open, setOpen, id }) {
  const { register, handleSubmit } = useForm();
  const [updateName, setUpdateName] = useState(article.article_name);
  const [updateContent, setUpdateContent] = useState(article.article_content);

  const [imgArticle, setImgArticle] = useState(null);

  const editArticle = async (data) => {
    try {
      await axios
        .post(API_ROUTE.EDITARTICLE + `${article.id}`, data, {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          setOpen(false);
          toast.success("Modificatiion réussi !!", {
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
      toast.error("Erreur dans la modiifiicatioin", {
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

  const changeHandler = (e) => {
    setImgArticle(e.target.files[0]);
  };

  useEffect(() => {
    if (imgArticle !== null) {
      addImg();
    }
  }, [imgArticle]);

  const addImg = async () => {
    const formData = new FormData();
    formData.append("image_name", imgArticle);
    formData.append("article_id", article.id);

    try {
      await axios
        .post(API_ROUTE.IMG, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setOpen(false);
          toast.success("Upload avec succès", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggablePercent: 60,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          toast.error("Upload échoué", {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        setOpen(false);
        setArticle(null);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box component="form" sx={style} onSubmit={handleSubmit(editArticle)}>
          <Typography variant="h6" component="h2">
            Modifier l'article : {article.article_name}
          </Typography>

          <TextField
            {...register("article_name")}
            id="transition-modal-title"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            fullWidth
            type="text"
            sx={{ mt: 2 }}
          />
          <TextField
            {...register("article_content")}
            id="transition-modal-description"
            value={updateContent}
            onChange={(e) => setUpdateContent(e.target.value)}
            multiline
            fullWidth
            rows={10}
            label="Description"
            sx={{ mt: 2 }}
          />

          <Button
            variant="outlined"
            type="submit"
            onClose={() => {
              setOpen(false);
              setArticle(null);
            }}
            sx={{ mt: 2 }}
          >
            Modifier
          </Button>

          <Typography variant="h6" component="h4" sx={{ mt: 3 }}>
            Tu souhaite ajouter une image à l'article :
          </Typography>

          <FilledInput
            type="file"
            name="file"
            fullWidth
            onChange={changeHandler}
            sx={{ mt: 2 }}
          />
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalArticle;
