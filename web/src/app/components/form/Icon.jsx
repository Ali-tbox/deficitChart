import { Box, Image } from "@chakra-ui/react";

const Icon = ({
  onClick,
  image,
  imageWidth,
  borderRadius,
  imageHeight,
  ...props
}) => {
  return (
    <Box
      onClick={onClick}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      cursor="pointer"
      {...props}
    >
      <Image
        objectFit="cover"
        src={image}
        alt="Icon"
        borderRadius={borderRadius}
        w={imageWidth}
        h={imageHeight}
      />
    </Box>
  );
};

export default Icon;
