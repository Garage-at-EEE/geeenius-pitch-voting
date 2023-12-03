import type { ComponentPropsWithoutRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

const CustomCard = styled("div")(({ theme, color }) => ({
  background: `linear-gradient(to right, rgba(27, 1, 27, 0.5),${
    color ? alpha(color, 0.8) : alpha(theme.palette.primary.main, 0.5)
  })`,
  width: "100%",
  height: "100%",
  backdropFilter: "blur(15px)",
  borderRadius: 15,
  padding: "2%",
  boxShadow: `0 3px 5px 2px ${
    color ? alpha(color, 0.5) : alpha(theme.palette.primary.main, 0.5)
  })`,
}));

export function RankCard({
  style,
  color,
  onClick,
  children,
}: {
  style: any;
  onClick: any;
  color: string;
  children: any;
}) {
  return (
    <CustomCard  color={color} style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0,paddingBottom: "0.3rem"}}>
    <CustomCard color={"#1B1B1BBB"} style={style} onClick={onClick}>
        {children}
    </CustomCard>
    </CustomCard>
  );
}
