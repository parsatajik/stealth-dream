import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PromotionBanner from "./components/PromotionBanner";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <PromotionBanner
        promotionText={`LIMITED TIME ONLY... 20% OFF STORE WIDE!!!`}
      />
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </Box>
  );
};

export default App;
