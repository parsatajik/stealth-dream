import React, { useState } from "react";
import {
  useBreakpointValue,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { LuMail, LuArrowRight } from "react-icons/lu";

import { db } from "../firebase";
import { collection, addDoc } from "@firebase/firestore";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [placeholder, setPlaceholder] = useState("Notify Me!");
  const toast = useToast();

  const size = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const handleFocus = () => setPlaceholder("Enter your email...");

  const handleBlur = () => {
    if (!email) setPlaceholder("Notify Me!");
  };

  const handleSubmitEmail = async () => {
    if (email.trim() === "" || !email.includes("@")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "marketingEmails"), {
        email: email,
      });

      toast({
        title: "Success",
        description:
          "Your email has been submitted. Make sure to follow us on Instagram and TikTok if you want to be considered for our July giveaway!",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top",
      });

      setEmail("");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "An error occurred while submitting your email.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <InputGroup maxW="400px" w="80%" mt="30px" size={size} variant="filled">
      <InputLeftElement
        pointerEvents="none"
        children={<LuMail width="25px" h="25px" />}
      />
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        fontSize={size}
        borderRadius="20px"
        color="blackAlpha.700"
        onKeyDown={async (e) => {
          if (e.key === "Enter" && email.length) {
            handleSubmitEmail();
          }
        }}
      />
      {email.length && (
        <InputRightElement
          children={
            <IconButton
              bgColor="blackAlpha.800"
              color="white"
              aria-label="Artefice Pinterest"
              icon={<LuArrowRight />}
              isRound
              _hover={{ opacity: 0.8, border: "none" }}
            />
          }
          onClick={handleSubmitEmail}
        />
      )}
    </InputGroup>
  );
};

export default EmailInput;
