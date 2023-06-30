import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import LOGO from "../assets/artefice_logo.png";

const NavBar = () => {
  const bg = useColorModeValue("#fafafc", "gray.800");
  const navigate = useNavigate();

  const LogoTextSize = useBreakpointValue({
    base: "sm",
    md: "lg",
  });

  return (
    <Box
      bg={bg}
      px={4}
      boxShadow="sm"
      w="100%"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" w="90%">
        <Box display="flex" alignItems="center" onClick={() => navigate("/")}>
          <Image w="40px" h="40px" src={LOGO} alt="Artefice Logo" mr="10px" />
          <Text fontSize={LogoTextSize} fontWeight={"bold"}>
            <Box as="span" color="cyan.500" pr="5px">
              Artefice
            </Box>
            | The Maker
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
