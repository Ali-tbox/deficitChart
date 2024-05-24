import { Box, Text } from "@chakra-ui/react";
import React from "react";
import colors from "../../config/colors";
function Badge({
  text,
  bgColor = colors.searchcolor,
  color = colors.bluebtn,
  paddingX = "10px",
  w = "auto",
  p,
  ...rest
}) {
  return (
    <Box
      w={w}
      bg={bgColor}
      borderRadius="8px"
      paddingY="6px"
      paddingX={paddingX}
      padding={p}
    >
      <Text
        color={color}
        textAlign="center"
        fontWeight={700}
        fontFamily="Raleway"
        fontSize="12px"
        lineHeight={"16px"}
        {...rest}
      >
        {text}
      </Text>
    </Box>
  );
}
export default Badge;
