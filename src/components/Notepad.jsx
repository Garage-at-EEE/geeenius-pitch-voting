import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NotepadConfig from "../config/Notepad-config.json";

export default function Notepad({ clan, children }) {
  //   let variants = {
  //     initial: { opacity: 0, scale: 0 },
  //     animate: { opacity: 1, scale: 1 },
  //     hover: {
  //       scale: 0.95,
  //       backgroundColor: hoverColor,
  //       transition: { duration: 0.2 },
  //     },
  //     tap: {
  //       scale: 1.05,
  //       backgroundColor: hoverColor,
  //       transition: { duration: 0.2 },
  //     },
  //   };

  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={{ opacity: 1 }}
      style={{
        padding: 2,
      }}
      transition={{ delay: 0.2 }}
      animate={{
        opacity: 0.1, // Adjust the opacity values for the fade effect
      }}
    >
      <Card
        component={motion.div}
        sx={{ p: "1%", borderRadius: 4, backgroundColor: NotepadConfig[clan] }}
      >
        <CardContent sx={{ height: "fit-content" }}>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
