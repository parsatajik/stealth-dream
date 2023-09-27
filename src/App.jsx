import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Feedback from "feeder-react-feedback"; // import Feedback component
import "feeder-react-feedback/dist/feeder-react-feedback.css"; // import stylesheet

const App = () => {
  return (
    <Box
      minW="100vw"
      minH="100vh"
      h="100%"
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgColor="#fafafc"
    >
      <Feedback projectId="651328d4ea2e6700025cb00c" />
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </Box>
  );
};

export default App;
