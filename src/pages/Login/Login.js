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

const LoginPage = () => {
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
    console.log(matricNumber);
    console.log(birthday);
    setLoading(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwTenNi8O1k4BRmHyYYDZlvB85Pc8YvTMDusWE-an5vXfzTRmMUU7LI4LDhV_Vv0T06/exec",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: JSON.stringify({
            action: "register",
            value: { matric: matricNumber, name: name },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
    setLoading(false);
  };

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
                label="Birthday (dd/mm)"
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
