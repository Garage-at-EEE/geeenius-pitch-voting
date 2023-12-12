import {
  Box,
  Button,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import EventCard from "components/EventCard/EventCard";
import { useMetadataContext } from "context/MetadataContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoute } from "utils/routes";
import AppHeader from "../../components/AppHeader/AppHeader";
import { HEADER_HEIGHT } from "../../utils/constants";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import BACKGROUND_IMG from "assets/garage_gang_pic.jpg";
import LoadingScreen from "components/LoadingScreen";
import AccountCard from "components/MainPage/AccountCard";
import GreetingCard from "components/MainPage/InnovatorCard";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { Parallax } from "react-parallax";
import { APP_SCRIPT } from "../../utils/constants";

const HeroComponent = (props) => {
  return (
    <Parallax
      bgImage={BACKGROUND_IMG}
      strength={200}
      style={{ paddingTop: HEADER_HEIGHT }}
    >
      <motion.div
        key={"main-page"}
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            width: "100%",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              background: "#00000088",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* <img src={BLUE_GARAGE_LOGO} height={"80px"} /> */}
            <Typography
              variant="h5"
              textAlign="center"
              width="70%"
              // fontWeight="800"
              color="white"
            >
              Get ready to dive into a high-energy Shark Tank event where you,
              as an investor, are on the hunt for the next big thing among the
              electrifying startups at Garage@EEE!
            </Typography>

            <AccountCard sx={{ width: { md: "50%", xs: "95%" } }} />

            <Typography
              variant="h5"
              textAlign="center"
              width="60%"
              // fontWeight="800"
              color="white"
            >
              Current Account Balance
            </Typography>

            <Typography
              variant="h1"
              textAlign="center"
              width="60%"
              fontWeight="800"
              color="white"
            >
              {"$" + props.totalBalance}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "50%",
                borderRadius: "5rem",
                marginTop: "2rem",
              }}
              onClick={(e) => {
                let events = document
                  .getElementById("events")
                  .getBoundingClientRect();
                e.preventDefault(); // Stop Page Reloading
                events &&
                  window.scrollTo({
                    behavior: "smooth",
                    top:
                      events.top -
                      document.body.getBoundingClientRect().top -
                      parseInt(HEADER_HEIGHT, 10),
                  });
              }}
            >
              Start Investing!
            </Button>
            <IconButton size="large">
              <KeyboardDoubleArrowDownIcon />
            </IconButton>
          </Box>
        </Box>
      </motion.div>
    </Parallax>
  );
};

const HomePage = () => {
  const metadata = useMetadataContext();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  const [totalBalance, setTotalBalance] = useState("Loading");
  const [returns, setReturns] = useState("Loading");
  const [investments, setInvestments] = useState("Loading");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [groupNo, setGroupNo] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchMyAPI(matric) {
      try {
        const response = await fetch(APP_SCRIPT, {
          method: "POST",
          body: JSON.stringify({
            action: "profile",
            value: { matric: matric },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if ((result.state = 200)) {
          console.log("Data from Home:");
          console.log(result);
          setTotalBalance(result["profile"].total_balance);
          setReturns(result["profile"].returns);
          setInvestments(result["profile"].investments);
          setCurrentIndex(result.index);
          setGroupName(result.group_name);
          setGroupNo(result.group_no);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        localStorage.removeItem("geeenius");
        navigate("/");
      }
    }

    if (localStorage.getItem("geeenius") == null) {
      navigate("/");
    } else {
      const storedObject = JSON.parse(localStorage.getItem("geeenius"));
      fetchMyAPI(storedObject.matric);
    }
  }, []);

  const handleCurrent = async () => {
    setRefresh(true);
    try {
      const response = await fetch(APP_SCRIPT, {
        method: "POST",
        body: JSON.stringify({ action: "current", value: [] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if ((result.state = 200)) {
        console.log("Data from Refresh:");
        console.log(result);
        setCurrentIndex(result.index);
        setGroupNo(result.group_no);
        setGroupName(result.group_name);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setRefresh(false);
  };

  return (
    <AnimatePresence mode={"wait"}>
      {/* <AppHeader /> */}
      {isLoading ? (
        <motion.div
          height={"100vh"}
          key={"loading-screen"}
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.4 }}
        >
          <LoadingScreen />
        </motion.div>
      ) : (
        <>
          <HeroComponent totalBalance={totalBalance} />
          <Box
            sx={{
              display: "flex",
              flexDirection: " column",
              flexGrow: 1,
              padding: "2rem",
              gap: "3rem",
              paddingTop: HEADER_HEIGHT,
              minHeight: "100vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column" }}
                id={"events"}
              >
                <Typography variant="h3" fontWeight="800">
                  Current Team
                </Typography>
              </Box>

              <Stack direction={"row"} alignItems={"center"}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    borderRadius: "5rem",
                  }}
                >
                  <Typography variant="h5" onClick={handleCurrent}>
                    {refresh ? "Refreshing..." : "Refresh Data!"}
                  </Typography>
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GreetingCard
                sx={{ width: { md: "50%", xs: "95%" } }}
                totalBalance={[totalBalance, setTotalBalance]}
                investments={[investments, setInvestments]}
                groupdata={{
                  currentIndex: currentIndex,
                  groupNo: groupNo,
                  groupName: groupName,
                }}
              />
            </Box>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
};

export default HomePage;
