import React from "react";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";

const PromotionBanner = ({ promotionText }) => {
  const fontSize = useBreakpointValue({ base: "xs", md: "md" });

  return (
    <Box
      w="100%"
      textAlign="center"
      bgColor="blackAlpha.800"
      color="cyan.400"
      p="12px"
    >
      <Text fontWeight="bold" fontSize={fontSize}>
        {promotionText}
      </Text>
    </Box>
  );
};

export default PromotionBanner;
