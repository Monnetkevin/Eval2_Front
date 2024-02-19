import React, { useEffect, useState } from "react";
import { API_FUNCTION } from "../../utils/RouteApi";
import { Box } from "@mui/material";
import CardsHome from "../utils/CardsHome";

function RandomArticleHome() {
  const [randomArticles, setRandomArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded === false) {
      API_FUNCTION.getRandomArticle().then((res) => setRandomArticles(res));
      setIsLoaded(true);
    }
  }, [isLoaded]);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {randomArticles.map((randomArticle, index) => (
        <CardsHome
          key={index}
          random={randomArticle.article_name}
          randomImg={randomArticle.image_name}
        />
      ))}
    </Box>
  );
}

export default RandomArticleHome;
