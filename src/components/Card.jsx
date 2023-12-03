import * as React from "react";
import { motion } from "framer-motion";
import { alpha, styled } from "@mui/material/styles";
import { Grid, Typography, Stack, Card } from "@mui/material";

const CustomCard = styled(motion("div"))(({ theme }) => ({
  background: `${alpha(theme.palette.secondary.main, 1)}`,
  width: "100%",
  minHeight: "1vh",
  // maxHeight: "48vh",
  alignItems: "center",
  // backdropFilter: "blur(15px)",
  padding: 4,
  borderRadius: 15,
  boxShadow: "0px 5px 6px 5px rgba(0,0,0,0.2)",
}));

export function DefaultCard({ children, sx, innerRef, style }) {
  return (
    <CustomCard sx={sx} ref={innerRef} style={style}>
      {children}
    </CustomCard>
  );
}
