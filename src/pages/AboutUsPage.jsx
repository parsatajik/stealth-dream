import React from "react";
import { Box, Image, useBreakpoint } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import A1 from "../assets/aboutUs/about1.png";
import A2 from "../assets/aboutUs/about2.png";
import A3 from "../assets/aboutUs/about3.png";

const AboutUsPage = () => {
  const imgW = useBreakpoint({
    base: "100%",
    md: "60%",
  });

  const padding = useBreakpoint({
    base: "0px",
    md: "50px",
  });

  return (
    <>
      <Helmet>
        <title>About Artefice - Our Vision for AI-Infused Fashion</title>
        <meta
          name="description"
          content="Learn more about Artefice, our vision, and how we're revolutionizing fashion with AI. Each piece is a unique expression of the creator's emotions and ideas."
        />
      </Helmet>
      <Box
        w="80%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={padding}
        m="50px"
        bgColor="white"
      >
        <Image w={imgW} src={A1} alt="about1" />
        <Image w={imgW} src={A2} alt="about1" />
        <Image w={imgW} src={A3} alt="about1" />
      </Box>
    </>
  );
};

export default AboutUsPage;
