import React from "react";
import {
  Modal,
  Box,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_ROUTE } from "../../utils/RouteApi";
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

function ModalImage({ article, setArticle, open, setOpen, event }) {
  const deleteImg = async (id) => {
    try {
      await axios
        .delete(API_ROUTE.DELETEIMG + `${id}`, {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
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
          event();
        });
    } catch {
      toast.error("Erreur dans la suppression", {
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
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setArticle(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Images de l'article : {article.article_name}
          </Typography>

          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {article.images.length > 0 ? (
              article.images.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    srcSet={`${item.image_name}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`http://127.0.0.1:8000/storage/uploads/${item.image_name}`}
                    alt={item.image_name}
                    loading="lazy"
                  />
                  <DeleteIcon
                    sx={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      color: "#9333EA",
                    }}
                    onClick={() => {
                      deleteImg(item.id);
                    }}
                  />
                </ImageListItem>
              ))
            ) : (
              <Typography>Pas d'image</Typography>
            )}
          </ImageList>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalImage;
