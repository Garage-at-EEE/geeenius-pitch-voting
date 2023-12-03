import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function ButtonCard({ title, content, sx, link, hoverColor }) {
  let variants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    hover: {
      scale: 0.95,
      backgroundColor: hoverColor,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 1.05,
      backgroundColor: hoverColor,
      transition: { duration: 0.2 },
    },
  };

  return (
    <a href={link}>
      <Card
        component={motion.div}
        sx={sx}
        initial="initial"
        animate="animate"
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        variants={variants}
        whileHover="hover"
        whileTap="tap"
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            fontWeight={600}
            sx={{ textTransform: "uppercase" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
