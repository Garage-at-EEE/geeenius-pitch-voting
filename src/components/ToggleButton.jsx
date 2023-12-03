import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";

export default function ToggleGroup({ MultiOption, option, setOption }) {
  const handleChange = (event, choices) => {
    setOption(choices);
  };

  return (
    <>
      <ToggleButtonGroup
        color="warning"
        value={option}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ paddingBottom: 2 }}
      >
        {MultiOption.map((choices, idx) => (
          <ToggleButton value={choices} key={idx}>
            <Typography sx={{ textTransform: "uppercase" }}>
              {choices}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
}
