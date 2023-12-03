import * as React from "react";
import { Typography } from "@mui/material";

// need to write function to match configuration with different variant
export default function CustomTypo({props, color, variant}: {
    color: string
    variant: string
    props: any
  }) {
  return (
    <Typography
      color={color}
      variant={variant}
      sx={props.sx}
      {...props}
    >
        <span>{props.children}</span>
    </Typography>
  );
}
