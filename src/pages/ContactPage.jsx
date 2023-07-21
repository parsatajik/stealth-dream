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
  useBreakpointValue,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const headingSize = useBreakpointValue({
    base: "2xl",
    md: "4xl",
  });

  const textSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const formLabelSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const padding = useBreakpointValue({
    base: "20px",
    md: "40px",
  });

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
      <Text fontSize={headingSize} fontWeight="bold" mb="20px" mt="60px">
        Drop a line!
      </Text>
      <Text
        fontSize={textSize}
        textAlign="center"
        ml="20px"
        mr="20px"
        mb="20px"
        w="80%"
      >
        Have a question? Want to share your experience with us? We'd love to
        hear from you!
      </Text>
      <Box
        w="80%"
        h="80%"
        ml="auto"
        mr="auto"
        p={padding}
        bgColor="blackAlpha.50"
        boxShadow="md"
        borderRadius="5px 0 0 5px"
        mb="100px"
      >
        <form onSubmit={handleSubmit}>
          <FormControl id="name" my="4">
            <FormLabel fontSize={formLabelSize}>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="filled"
              bgColor="white"
              required
              fontSize={textSize}
            />
          </FormControl>

          <FormControl id="email" my="4">
            <FormLabel fontSize={formLabelSize}>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              bgColor="white"
              required
              fontSize={textSize}
            />
          </FormControl>

          <FormControl id="message" my="4">
            <FormLabel fontSize={formLabelSize}>Message</FormLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="filled"
              bgColor="white"
              minH="200px"
              size="lg"
              required
              fontSize={textSize}
            />
          </FormControl>

          <Button
            bgColor="blackAlpha.800"
            color="white"
            _hover={{ opacity: "0.7", border: "none" }}
            type="submit"
            w="100%"
            mt="10px"
            fontSize={textSize}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ContactUsPage;
