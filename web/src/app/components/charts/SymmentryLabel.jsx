import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import colors from "../../config/colors";

function SymmentryLabel({ text1, color1, text2, color2 }) {
  return (
    <div>
      <Box display="flex" gap={"20px"}>
        <Box display="flex" gap="4px" alignItems="center">
          <Box bg={color1} borderRadius="2px" h="10px" w="10px"></Box>
          <Text
            lineHeight={"16px"}
            textAlign={"center"}
            fontSize="11px"
            fontFamily={"Noto Sans"}
            color={colors.faintblack}
          >
            {text1}
          </Text>
        </Box>
        {text2 && (
          <Box display="flex" gap="4px" alignItems="center">
            <Box bg={color2} borderRadius="2px" h="10px" w="10px"></Box>
            <Text
              lineHeight={"16px"}
              fontFamily={"Noto Sans"}
              fontSize="11px"
              color={colors.faintblack}
            >
              {text2}
            </Text>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default SymmentryLabel;
