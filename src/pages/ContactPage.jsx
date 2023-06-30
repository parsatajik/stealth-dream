import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_82ozl3q",
        "template_il5lwdc",
        { name, email, message },
        "Y_dHfXnjFxYu40Qc1"
      );

      toast({
        title: "Message sent",
        description:
          "We've received your message and will get back to you shortly.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);

      toast({
        title: "An error occurred.",
        description: "Your message was not able to be sent.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Text fontSize="4xl" fontWeight="bold" mb="40px" mt="60px">
        Contact Us
      </Text>
      <Box w="80%" h="80%" ml="auto" mr="auto" p="40px" bgColor="blackAlpha.50">
        <form onSubmit={handleSubmit}>
          <FormControl id="name" my="4">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="filled"
              bgColor="white"
              required
              borderRadius="0"
            />
          </FormControl>

          <FormControl id="email" my="4">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              bgColor="white"
              borderRadius="0"
              required
            />
          </FormControl>

          <FormControl id="message" my="4">
            <FormLabel>Message</FormLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="filled"
              bgColor="white"
              minH="200px"
              size="lg"
              borderRadius="0"
              required
            />
          </FormControl>

          <Button
            colorScheme="cyan"
            type="submit"
            w="100%"
            borderRadius="0"
            mt="10px"
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ContactUsPage;
