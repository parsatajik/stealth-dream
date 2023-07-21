import React from "react";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import EmailInput from "../components/EmailInput";
import SocialIcons from "../components/SocialIcons";
import Spline from "@splinetool/react-spline";

const ComingSoonPage = () => {
  const subTextSize = useBreakpointValue({
    base: "xl",
    md: "3xl",
  });

  const headerTextSize = useBreakpointValue({
    base: "3xl",
    md: "5xl",
  });

  return (
    <Box
      h="100vh"
      w="100vw"
      bgColor="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, cyan.100, pink.100)"
    >
      <Spline
        scene="https://prod.spline.design/6ISAR9c17ZBxn1Lh/scene.splinecode"
        style={{ height: "50%" }}
      />

      <Text fontSize={subTextSize} color="blackAlpha.600">
        Artefice
      </Text>

      <Text fontSize={headerTextSize} fontWeight="bold" color="blackAlpha.800">
        Coming Soon
      </Text>

      <Text fontSize={subTextSize} color="blackAlpha.600" textAlign="center">
        Revolutionizing Fashion with AI
      </Text>

      <EmailInput />

      <SocialIcons />
    </Box>
  );
};

export default ComingSoonPage;
