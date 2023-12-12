import React, { useEffect, useState, useRef } from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { DefaultCard } from "components/Card";
import LoadingScreen from "components/LoadingScreen";
import { delay } from "utils/helper";
import { FadeInWhenVisible } from "components/Animations";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import styled from "@emotion/styled";
import BACKGROUND_IMG from "assets/doodle-background.png";
import PROFILE_IMG from "assets/PROFILE PIC.png";
import GARAGE_LINKTREE from "assets/garage_linktree.png";

// ...

const RotationWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
`;

export default function AccountCard(props) {
  // handle mouse move on document
  const storedObject = JSON.parse(localStorage.getItem("geeenius"));

  return (
    <Box {...props}>
      <FadeInWhenVisible>
        <DefaultCard>
          <Box
            sx={{
              backgroundImage: `url(${BACKGROUND_IMG})`,
              backgroundSize: "cover",
              backdropFilter: "blur(16px)",
            }}
          >
            <Grid
              container
              sx={{
                aspectRatio: "2/1",
                padding: 2,
              }}
            >
              <Grid item xs={5} md={4}>
                <motion.div
                  style={{
                    borderRadius: 8,
                    backgroundColor: "white",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={PROFILE_IMG}
                  />
                </motion.div>

                <Typography
                  variant={"h5"}
                  fontWeight={700}
                  fontSize={10}
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: 3,
                    color: "#294283",
                    m: 0,
                  }}
                >
                  Active Since
                </Typography>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "#294283",
                  }}
                >
                  2023
                </Typography>
              </Grid>
              <Grid item xs={7} md={8}>
                <Stack
                  sx={{
                    justifyContent: "space-around",
                    height: "100%",
                  }}
                >
                  <Stack
                    sx={{
                      flex: 2,
                      height: "100%",
                      padding: 2,
                    }}
                  >
                    <Typography
                      variant={"h5"}
                      fontWeight={700}
                      fontSize={10}
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: 3,
                        color: "#294283",
                        m: 0,
                      }}
                    >
                      Investor Portfolio
                    </Typography>
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        color: "#294283",
                      }}
                    >
                      Big Money Corporation
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      fontSize={10}
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: 3,
                        color: "#294283",
                      }}
                    >
                      Name
                    </Typography>
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        color: "#294283",
                      }}
                    >
                      {storedObject.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      fontSize={10}
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: 3,
                        color: "#294283",
                      }}
                    >
                      Type
                    </Typography>
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        color: "#294283",
                      }}
                    >
                      Angel Investor
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ width: { md: "124px", xs: 64 } }}>
                      <a href="https://linktr.ee/garage_eee">
                        <img style={{ width: "100%" }} src={GARAGE_LINKTREE} />
                      </a>
                    </Box>

                    <Typography
                      fontSize={18}
                      fontWeight={600}
                      sx={{
                        textAlign: "right",
                        textTransform: "uppercase",
                        letterSpacing: 3,
                        color: "#294283",
                      }}
                    >
                      Garage@EEE
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </DefaultCard>
      </FadeInWhenVisible>
    </Box>
  );
}
