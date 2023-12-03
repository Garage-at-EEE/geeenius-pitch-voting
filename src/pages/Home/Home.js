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

const itemsPerPage = 8;

const HeroComponent = () => {
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
              $69.69
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
  const Navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState(moment().subtract(6, "months"));
  const [endDate, setEndDate] = useState(moment());
  const [filter, setFilter] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Simulate a delay using setTimeout
    const delay = 2000; // Adjust the delay time in milliseconds (e.g., 2000ms = 2 seconds)

    const timer = setTimeout(() => {
      // After the delay, change the loading state to false
      setLoading(false);
    }, delay);

    // Clean up the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredMetadata = metadata?.filter((item) => {
    return (
      item.product_list[0].prod_desc
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (filter.length == 0 ||
        item.event_type_tags.some((r) => {
          return filter.map((i) => i.toLowerCase()).includes(r);
        }))
    );
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredMetadata?.slice(startIndex, endIndex);

  useEffect(() => {
    setPage(1);
  }, [filteredMetadata?.length]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const mostRecentMetadata = metadata?.filter((item) => {
    const itemDate = moment(item.event_start);
    return itemDate.isAfter(startDate) && itemDate.isBefore(endDate);
  });

  const MapEventCards = (inputData) => {
    return inputData?.map((item) => {
      var latestProduct = item.product_list.find((data) => {
        return data.isLatest == true;
      });

      // console.log(item);
      return (
        <EventCard
          Title={item.event_display_name}
          Image={latestProduct.prod_main_png}
          Description={latestProduct.prod_desc}
          Date={`${item.event_start} | ${item.event_end}`}
          LastUpdated={latestProduct.prod_date}
          Tags={item.event_type_tags}
          key={item.event_display_name}
          onClick={() => {
            Navigate(getRoute("leaflet"), {
              state: {
                event: item,
                product_list: item.product_list,
              },
            });
          }}
        />
      );
    });
  };

  return (
    <AnimatePresence mode={"wait"}>
      <AppHeader />
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
          <HeroComponent />
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
                <Typography variant="h6">Click to view</Typography>
              </Box>

              <Stack direction={"row"} alignItems={"center"}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    borderRadius: "5rem",
                  }}
                >
                  <Typography variant="h5">Refresh Data!</Typography>
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GreetingCard sx={{ width: { md: "50%", xs: "95%" } }} />
            </Box>
            {/* 
<Grid
  sx={{ padding: "1rem" }}
  container
  spacing={{ xs: 2, md: 3 }}
>
  {MapEventCards(paginatedData)}
</Grid> */}
            <Box width={"100%"} display={"flex"} justifyContent={"center"}>
              <Pagination
                // variant="outlined"
                color="primary"
                count={Math.ceil(filteredMetadata?.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                size="large"
              />
            </Box>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
};

export default HomePage;
