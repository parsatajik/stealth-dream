import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import LOGO from "../assets/artefice-logo-v3-transparent.png";

const NavBar = () => {
  const navigate = useNavigate();

  const LogoTextSize = useBreakpointValue({
    base: "sm",
    md: "lg",
  });

  return (
    <Box
      bgColor="blackAlpha.100"
      px={4}
      boxShadow="md"
      w="100%"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" w="95%">
        <Box display="flex" alignItems="center" onClick={() => navigate("/")}>
          <Image w="55px" h="55px" src={LOGO} alt="Artefice Logo" mr="10px" />
          <Text fontSize={LogoTextSize} fontWeight={"bold"}>
            Artefice
          </Text>
        </Box>

        <Flex align={"center"} gap="25px">
          <NavItem url="about-us">About</NavItem>
          <NavItem url="contact-us">Contact</NavItem>
        </Flex>
      </Flex>
    </Box>
  );
};

const NavItem = ({ children, url }) => {
  const NavItemTextSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  return (
    <Text fontSize={NavItemTextSize} fontWeight="bold">
      <Link to={url}>{children}</Link>
    </Text>
  );
};

export default NavBar;
