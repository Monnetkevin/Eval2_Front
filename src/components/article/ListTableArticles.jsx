import React, { useContext, useState, useEffect } from "react";
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
import { API_FUNCTION, API_ROUTE } from "../../utils/RouteApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";

import ModalImageArticle from "./ModalImageArticle";
import ModalArticle from "../utils/ModalArticle";
import { GlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";

function ListTableArticles() {
  const [open, setOpen] = useState(false);
  const [openModalImage, setOpenModalImage] = useState(false);
  const [reload, setReload] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { articles, setArticles } = useContext(GlobalContext);

  const updateSelectedArticle = () => {
    if (selectedArticle) {
      setSelectedArticle(
        articles.find((article) => article.id === selectedArticle.id)
      );
    }
  };

  const deleteArticle = (id) => {
    try {
      axios
        .delete(API_ROUTE.DELETEARTICLE + `${id}`, {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          setArticles((prev) => prev.filter((item) => item.id !== id));
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
  useEffect(() => {
    API_FUNCTION.allArticle().then((res) => setArticles(res));
  }, [open, reload]);

  useEffect(() => {
    updateSelectedArticle();
  }, [articles]);

  return (
    <Container>
      {articles.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700, mt: 5 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Nom</TableCell>
                <TableCell align="right">Déscription</TableCell>
                <TableCell align="right">Créé le</TableCell>
                <TableCell align="right">Créé par</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell component="th" scope="row">
                    {article.id}
                  </TableCell>
                  <TableCell align="right">{article.article_name}</TableCell>
                  <TableCell align="right">{article.article_content}</TableCell>
                  <TableCell align="right">{article.created_at}</TableCell>
                  <TableCell align="right">{article.name}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      ml: 5,
                    }}
                  >
                    <DeleteIcon
                      sx={{ cursor: "pointer", color: "#9333EA" }}
                      onClick={() => {
                        deleteArticle(article.id);
                      }}
                    />

                    <ImageIcon
                      sx={{ cursor: "pointer", color: "#9333EA" }}
                      onClick={() => {
                        setSelectedArticle(article);
                        setOpenModalImage(true);
                      }}
                    />
                    {openModalImage === true && (
                      <ModalImageArticle
                        article={selectedArticle}
                        setArticle={setSelectedArticle}
                        open={openModalImage}
                        setOpen={setOpenModalImage}
                        event={() => setReload((prev) => prev + 1)}
                      />
                    )}

                    <EditIcon
                      sx={{ cursor: "pointer", color: "#9333EA" }}
                      onClick={() => {
                        setSelectedArticle(article);
                        setOpen(true);
                      }}
                    />
                    {open === true && (
                      <ModalArticle
                        article={selectedArticle}
                        setArticle={setSelectedArticle}
                        open={open}
                        setOpen={setOpen}
                      />
                    )}
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

export default ListTableArticles;
