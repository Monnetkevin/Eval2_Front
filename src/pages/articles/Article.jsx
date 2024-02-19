import React, { useContext } from "react";
import Cards from "../../components/utils/Cards";
import { GlobalContext } from "../../components/context/GlobalContext";
import { Container } from "@mui/material";

function Article() {
  const { articles } = useContext(GlobalContext);

  return (
    <Container>
      {articles.map((article) => (
        <Cards key={article.id} article={article} />
      ))}
    </Container>
  );
}

export default Article;
