import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";

import * as constants from "../config/constants";

import { alpha, styled } from "@mui/material/styles";

const CustomNavBar = styled(AppBar)(({ theme }) => ({
  background: `${alpha(
    theme.palette.primary.main,
    0.95
  )})`,
  backdropFilter: "blur(15px)",
  marginTop: "0.5%",
  borderRadius: 15,
  boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.main, 0.2)}`,
}));

export default function ButtonAppBar() {
  const MenuList = constants["menu"];
  return (
    <Box
      sx={{
        flexGrow: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <CustomNavBar position="static">
        <Toolbar>
          <Button href="/" sx={{paddingTop: 1, paddingBottom: 2 }}>
            <Image
              src="/white-garage-logo.png"
              alt="Garage Logo"
              height={45}
              width={158}
              priority
              style={{ justifyContent: "left"}}
              
            />
          </Button>
          {/* <Typography
            variant="h5"
            sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: 10, ml: "1%" }}
          >
            
          </Typography> */}
          <Box>
            {MenuList.map((item, index) => (
              <Button key={index} color="inherit" href={item.url}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </CustomNavBar>
    </Box>
  );
}
