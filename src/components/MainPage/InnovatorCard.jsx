import React, { useEffect, useState, useRef } from "react";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { DefaultCard } from "components/Card";
import LoadingScreen from "components/LoadingScreen";
import { delay } from "utils/helper";
import { FadeInWhenVisible } from "components/Animations";
import SG_BG from "assets/singapore-bg.png";
import CARROT_BG from "assets/carrot-bg.png";
import INNOVATOR_ICON from "assets/innovator-icon.png";
import SG_ICON from "assets/singapore-icon.jpeg";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import styled from "@emotion/styled";

export default function InnovatorCard(props) {
  const [investedAmount, setInvestedAmount] = useState(0);
  const [isInvested, setIsInvested] = useState(false);

  const handleIncreaseInvestment = () => {
    setInvestedAmount(investedAmount + 100); // Change the amount as needed
  };

  const handleDecreaseInvestment = () => {
    if (investedAmount > 0) {
      setInvestedAmount(investedAmount - 100); // Change the amount as needed
    }
  };

  const handleInvest = () => {
    // Perform investment action here, like API calls or state updates
    setIsInvested(true);
    // Reset invested amount after investing (if needed)
    // setInvestedAmount(0);
  };

  return (
    <Box {...props}>
      <FadeInWhenVisible>
        <DefaultCard
          style={{
            aspectRatio: "4/5",
          }}
          sx={{ backgroundColor: "#294283AA" }}
        >
          <Box
            sx={{
              p: 2,
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
              display: "flex",

              borderRadius: 2,

              backgroundImage: `url(${CARROT_BG})`,
              backgroundSize: "cover",
            }}
          >
            <Box
              sx={{
                flex: 1,
                minHeight: 0,

                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  objectFit: "contain",
                  // backgroundColor: "white",
                  borderRadius: 8,
                }}
                src={INNOVATOR_ICON}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              <Typography
                variant={"h5"}
                fontSize={15}
                fontWeight={700}
                sx={{
                  textTransform: "uppercase",
                  textAlign: "center",
                  letterSpacing: 3,
                  color: "white",
                  m: 0,
                }}
              >
                TEAM HEATSIG
              </Typography>
              <Typography
                variant={"h6"}
                fontSize={15}
                fontWeight={500}
                sx={{
                  textTransform: "uppercase",
                  textAlign: "center",
                  letterSpacing: 3,
                  color: "white",
                  m: 0,
                }}
              >
                Team 5! 🇸🇬
              </Typography>
            </Box>

            <Box>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                mt={2}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDecreaseInvestment}
                >
                  -
                </Button>
                <Typography
                  variant="h3"
                  textAlign="center"
                  fontWeight="800"
                  color="white"
                >
                  ${investedAmount}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleIncreaseInvestment}
                >
                  +
                </Button>
              </Stack>
            </Box>

            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleInvest}
              >
                Invest
              </Button>
            </Box>

            {/* Investment indicator */}
            {isInvested && (
              <Box textAlign="center" mt={2}>
                <Typography variant="body2" color="green">
                  Invested!
                </Typography>
              </Box>
            )}
          </Box>
        </DefaultCard>
      </FadeInWhenVisible>
    </Box>
  );
}
