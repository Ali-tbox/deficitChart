import { Box, Progress } from "@chakra-ui/react";
import React from "react";
const progress = {
  medium: "linear-gradient(to right, #C09F3F, #F7CC50)",
  fair: "linear-gradient(to right, #C09F3F, #F7CC50)",
  poor: "linear-gradient(to right, #B03E33, #EB5A4B)",
  good: "linear-gradient(to right, #2AA157, #74CD96)",
};
const progressValue = {
  medium: "50",
  poor: "25",
  good: "75",
  fair: "50",
};
function ProgressBar({ type, value }) {
  const progressColor = progress[type];
  //   console.log('progressColor', progress[type])
  return (
    <Box>
      <Progress
        w={"100%"}
        h={"14px"}
        borderRadius="8px"
        size="sm"
        value={progressValue[type]}
        sx={{
          "& > div": {
            background: progressColor,
          },
        }}
        className="progress-container"
        background={"#E6E6E6"}
      />
    </Box>
  );
}
export default ProgressBar;
