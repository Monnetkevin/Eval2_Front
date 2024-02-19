import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Box, Button, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  const { categories } = useContext(GlobalContext);

  return (
    <Box component="header">
      <Toolbar sx={{ justifyContent: "space-between", overflow: "auto" }}>
        {categories.length > 0 &&
          categories.map((category, index) => (
            <Button
              key={index}
              component={RouterLink}
              to={`/categorie/${category.id}`}
              variant="body2"
              sx={{ p: 1, flexShrink: 0 }}
            >
              {category.category_name}
            </Button>
          ))}
      </Toolbar>
    </Box>
  );
}

export default Header;
