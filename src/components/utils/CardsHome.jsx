import React from "react";
import { CardContent, Typography, Box } from "@mui/material";

function CardsHome({ random, randomImg }) {
  return (
    <Box component="div" sx={{ m: 5, position: "relative", cursor: "pointer" }}>
      <Box
        component="img"
        sx={{ width: 350, height: 450 }}
        src={`http://127.0.0.1:8000/storage/uploads/${randomImg}`}
        alt={random}
      />
      <CardContent
        sx={{
          width: "fit-content",
          bgcolor: "#5F6873",
          position: "absolute",
          top: 0,
          left: 0,
          color: "white",
          "&:hover": { color: "black", bgcolor: "white" },
        }}
      >
        <Typography variant="h5" component="div">
          {random}
        </Typography>
      </CardContent>
    </Box>
  );
}

export default CardsHome;
