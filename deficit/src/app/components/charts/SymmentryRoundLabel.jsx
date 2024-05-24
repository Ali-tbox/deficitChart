import { Box, Text } from "@chakra-ui/react";
import React from "react";
import colors from "../../config/colors";

function SymmentryRoundLabel({ text, color }) {
  return (
    <Box>
      <Box display="flex" gap={"20px"}>
        <Box display="flex" gap="4px" alignItems="center">
          <Box bg={color} borderRadius="full" h="10px" w="10px"></Box>
          <Text
            fontFamily={"Noto Sans"}
            lineHeight={"16px"}
            textAlign={"center"}
            fontSize="11px"
            color={colors.faintblack}
          >
            {text}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default SymmentryRoundLabel;
