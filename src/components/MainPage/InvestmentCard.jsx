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

import { APP_SCRIPT, MoneyAnimation } from "../../utils/constants";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import styled from "@emotion/styled";
import DynamicIconMUI from "components/Reusables/DynamicIconMUI";

export default function InvestmentCard({ InvestmentData }) {
  const storedObject = JSON.parse(localStorage.getItem("geeenius"));
  const [investedAmount, setInvestedAmount] = useState(0);
  const [isInvested, setIsInvested] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleConfirmInvestment = async () => {
    setOpenDialog(false);

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
            maxHeight: "80vh",
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
                    flex: 2,
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

                <Box
                  sx={{
                    display: "flex",
                    flex: 2,
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
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
                      <DynamicIconMUI
                        iconName={"RemoveRounded"}
                        fontSize={"large"}
                      />
                    </Button>
                    <Typography
                      variant="h2"
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
                      <DynamicIconMUI
                        iconName={"AddRounded"}
                        fontSize={"large"}
                      />
                    </Button>
                  </Stack>
                  <Box textAlign="center" mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={handleInvest}
                      disabled={isInvesting}
                    >
                      {isInvesting ? "Sending bid..." : "Invest"}
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </DefaultCard>
      </FadeInWhenVisible>
    </Box>
  );
}
