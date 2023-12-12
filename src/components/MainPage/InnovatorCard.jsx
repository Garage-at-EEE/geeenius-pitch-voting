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

import { APP_SCRIPT } from "../../utils/constants";

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
  const storedObject = JSON.parse(localStorage.getItem("geeenius"));
  const [investedAmount, setInvestedAmount] = useState(0);
  const [isInvested, setIsInvested] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);

  if (
    props.investments[0][props.groupdata["currentIndex"] - 1] === "" &&
    isInvested === true
  ) {
    setIsInvested(false);
  } else if (
    props.investments[0][props.groupdata["currentIndex"] - 1] !== "" &&
    isInvested === false
  ) {
    setIsInvested(true);
  }

  const handleIncreaseInvestment = () => {
    if (investedAmount < props.totalBalance[0]) {
      setInvestedAmount(investedAmount + 25); // Change the amount as needed
    }
  };

  const handleDecreaseInvestment = () => {
    if (investedAmount > 0) {
      setInvestedAmount(investedAmount - 25); // Change the amount as needed
    }
  };

  const handleInvest = async () => {
    setIsInvesting(true);
    try {
      const response = await fetch(APP_SCRIPT, {
        method: "POST",
        body: JSON.stringify({
          action: "invest",
          value: {
            matric: storedObject.matric,
            team: props.groupdata["currentIndex"],
            value: investedAmount,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if ((result.state = 200)) {
        // Perform investment action here, like API calls or state updates
        setIsInvested(true);
        // Reset invested amount after investing (if needed)
        props.totalBalance[1]((prevCount) => prevCount - investedAmount);
        props.investments[1]((prevNumbers) =>
          prevNumbers.map((number, index) => {
            return index === props.groupdata["currentIndex"] - 1
              ? investedAmount
              : number;
          })
        );
        setInvestedAmount(0);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setIsInvesting(false);
  };

  return (
    <Box sx={props.sx}>
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
            {!isInvested && (
              <>
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
                    {props.groupdata["groupName"]}
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
                    {"Team " + props.groupdata["groupNo"]}
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
                    disabled={isInvesting}
                  >
                    {isInvesting ? "Sending bid..." : "Invest"}
                  </Button>
                </Box>
              </>
            )}

            {/* Investment indicator */}
            {isInvested && (
              <Box textAlign="center" mt={2}>
                <Typography variant="h1" color="white">
                  {props.groupdata["groupName"] + "\nInvested!"}
                </Typography>
              </Box>
            )}
          </Box>
        </DefaultCard>
      </FadeInWhenVisible>
    </Box>
  );
}
