import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import { motion } from "framer-motion";

export const HOST = "http://146.190.194.29:80";
export const AVATAR_API = "https://ui-avatars.com/api";
export const METADATA_API =
  // "https://aria-sg-products.s3-ap-southeast-1.amazonaws.com/metadata.all.json";
  "https://aria-sg-products.s3-ap-southeast-1.amazonaws.com/metadata.json";
export const API = HOST + "/api";
export const AUTH_TOKEN = "authToken";
export const BEARER = "Bearer";
export const GRAPHQL = HOST + "/graphql";

export const HEADER_HEIGHT = "76px";

export const APP_SCRIPT =
  "https://script.google.com/macros/s/AKfycbwjQT61gAbZ0JlnHOMKkWm4EgCyuHHvyf2h6jepAv1v5JCOvszqsjSdNhhtN83iZlLN/exec";

const GearAnimation = () => {
  return (
    <motion.div
      style={{ width: "fit-content" }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
      <SettingsRoundedIcon
        fontSize={"large"}
        sx={{ color: "grey", fontSize: 140 }}
      />
    </motion.div>
  );
};

const HeartAnimation = () => {
  return (
    <motion.div
      style={{ width: "fit-content" }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <FavoriteIcon fontSize={"large"} sx={{ color: "red", fontSize: 140 }} />
    </motion.div>
  );
};

const MoneyAnimation = () => {
  return (
    <motion.div
      style={{ width: "fit-content" }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <LocalAtmOutlinedIcon
        fontSize={"large"}
        sx={{ color: "green", fontSize: 140 }}
      />
    </motion.div>
  );
};

export const loadingText = [
  {
    icon: <GearAnimation />,
    top_text: "You guys Eggcited for GEEEnius?",
    bottom_text: "Hope you're enjoying!",
  },

  {
    icon: <GearAnimation />,
    top_text: "Please wait...",
    bottom_text: "Engineering work is time consuming 😭",
  },

  {
    icon: <MoneyAnimation />,
    top_text: "Did we remember to pay AWS?",
    bottom_text: "Hmm, server might be giving up :)",
  },

  {
    icon: <GearAnimation />,
    top_text: "Gearing up",
    bottom_text: "Things nvr work when you need em 😭",
  },

  {
    icon: <HeartAnimation />,
    top_text: "Live. Laugh. Love.",
    bottom_text: "Or better yet, Live. Laugh. Garage.",
  },
];

// Create a theme instance.
const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#294283",
    },
    secondary: {
      main: "#32dcbe",
    },
    error: {
      main: red.A400,
    },
  },
});

export const customTheme = responsiveFontSizes(defaultTheme);
