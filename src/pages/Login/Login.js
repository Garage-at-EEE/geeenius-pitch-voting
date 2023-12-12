import { Box, Grid, Stack, Typography } from "@mui/material";
import BACKGROUND_IMG from "assets/doodle-background.png";
import PROFILE_IMG from "assets/PROFILE PIC.png";
import GARAGE_LINKTREE from "assets/garage_linktree.png";
import { useEffect, useState } from "react";
import LoadingScreen from "components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";

import { DefaultCard } from "components/Card";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { APP_SCRIPT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [matricNumber, setMatricNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [name, setName] = useState("");

  const handleMatricNumberChange = (event) => {
    setMatricNumber(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(APP_SCRIPT, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          action: "login",
          value: { matric: matricNumber, name: name, passcode: birthday },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Data from login:");
      console.log(result);
      localStorage.setItem(
        "geeenius",
        JSON.stringify(result.investment_portfolio)
      );
      navigate("/home");
    } catch (error) {
      console.error("Error:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("geeenius") != null) {
      navigate("/home");
    }
    // Simulate a delay using setTimeout
    const delay = 2000; // Adjust the delay time in milliseconds (e.g., 2000ms = 2 seconds)

    const timer = setTimeout(() => {
      // After the delay, change the loading state to false
      setLoading(false);
    }, delay);

    // Clean up the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode={"wait"}>
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
        <Container
          maxWidth="sm"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Card style={{ backgroundColor: "black" }}>
            <CardContent>
              <Typography
                variant="h5"
                textAlign="center"
                width="100%"
                // fontWeight="800"
                color="white"
              >
                Garage@EEE!
              </Typography>
              <TextField
                label="Matric Number"
                variant="outlined"
                fullWidth
                margin="normal"
                color="primary"
                value={matricNumber}
                onChange={handleMatricNumberChange}
              />
              <TextField
                label="Birthday (ddmm)"
                variant="outlined"
                fullWidth
                margin="normal"
                color="primary"
                value={birthday}
                onChange={handleBirthdayChange}
              />
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                color="primary"
                value={name}
                onChange={handleNameChange}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default LoginPage;
