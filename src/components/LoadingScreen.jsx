import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ThreeDotsWave from "./LoadingAnimation";
import { loadingText } from "utils/constants";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [loadingData, setLoadingData] = useState();
  const getLoadingData = () => {
    const len = loadingText.length;
    setLoadingData(loadingText[Math.floor(Math.random() * len)]);
  };

  useEffect(() => {
    getLoadingData();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          padding: 2,
          height: "90vh",
          alignItems: "center",
        }}
      >
        <Grid item xs={12}>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            {loadingData?.icon}
          </Box>

          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {loadingData?.top_text}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: 3,
              color: "#294283",
            }}
          >
            {loadingData?.bottom_text}
          </Typography>
          <ThreeDotsWave />
        </Grid>
      </Grid>
    </>
  );
}
