import { Typography, Box, ImageListItem } from "@mui/material";
import React from "react";

function Cards({ article }) {
  return (
    <Box component="section">
      <Typography variant="h6" component="h2">
        {article.article_name}
      </Typography>
      <Box component="div" sx={{ width: 300 }} cols={3} rowHeight={164}>
        {article.images.length > 0 ? (
          <ImageListItem>
            <img
              src={`http://127.0.0.1:8000/storage/uploads/${article.images.image_name}`}
              alt={article.images.image_name}
            />
          </ImageListItem>
        ) : (
          <Typography>Pas d'image</Typography>
        )}
      </Box>

      <Typography>{article.article_content}</Typography>
    </Box>
  );
}

export default Cards;
