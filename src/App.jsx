import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

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
      paddingBottom="60px"
    >
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default App;
