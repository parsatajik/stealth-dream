// TODO: compartmentalize this file

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Switch,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  Text,
  Textarea,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import Tip from "../components/Tip";
import TShirtMockup from "../components/TShirtMockUp";
import Gallery from "../components/Gallery";
import Slider from "../components/Slider";
import mixpanel from "mixpanel-browser";
import { db } from "../firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import {
  COLORS,
  SIZES,
  SURPRISE_ME_PROMPTS,
  TIPS,
  CUSTOMER_IMAGES,
} from "../constants";

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const stripeAppearance = {
  theme: "stripe",
};

export const loader = async ({ params }) => {
  const username = params.username;

  const purchasesQuery = query(
    collection(db, "purchases"),
    where("isShareable", "==", true),
    limit(100)
  );

  const purchasesSnapshot = await getDocs(purchasesQuery);

  const purchasesImages = purchasesSnapshot.docs.map((doc) => ({
    url: doc.data().selectedImage,
    alt: doc.data().prompt,
  }));

  return { affiliate: username, images: purchasesImages };
};

const CreatePage = ({ isAffiliate }) => {
  const [dreamInput, setDreamInput] = useState("");
  const [requestActive, setRequestActive] = useState(false);
  const [dreamImgs, setDreamImgs] = useState([]);
  const [tip, setTip] = useState(getRandomElement(TIPS));
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [stripeClientSecret, setStripeClientSecret] = useState("");
  const [stripePaymentIntentId, setStripePaymentIntentId] = useState("");
  const [shareCreation, setShareCreation] = useState(true);

  const loaderData = useLoaderData();
  const affiliate = isAffiliate ? loaderData?.affiliate : null;
  const images = loaderData?.images;

  const dreamImagesGridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "repeat(3, 1fr)",
  });

  const customizeShirtFlexDir = useBreakpointValue({
    base: "column",
    md: "row",
  });

  const inputFontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const inputPlaceHolder = useBreakpointValue({
    base: "What's your dream?",
    md: "Tell me what you want to see on your t-shirt...",
  });

  const makeMyShirtButtonSize = useBreakpointValue({
    base: "xs",
    md: "md",
  });

  const makeMyShirtButtonText = useBreakpointValue({
    base: "Make!",
    md: "Make my shirt!",
  });

  const sizesGridTemplateColumns = useBreakpointValue({
    base: "repeat(3, 1fr)",
    md: "1fr",
  });

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const fetchImage = async (dream) => {
    try {
      const response = await axios.post(
        `/api/generateImage`,
        {
          dream: dream,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      mixpanel.track("Image Generation", {
        prompt: dream,
      });

      return response.data.data;
    } catch (e) {
      console.error(e);
    }
  };

  const handleDesignCreation = async () => {
    try {
      if (!requestActive) {
        setDreamImgs([]);
        setRequestActive(true);
        setTip(getRandomElement(TIPS));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSurpriseMe = () => {
    setDreamInput(getRandomElement(SURPRISE_ME_PROMPTS));
  };

  useEffect(() => {
    async function fetchDreamImgs() {
      if (requestActive) {
        const imgs = await fetchImage(dreamInput);
        setDreamImgs(imgs);
      }
    }
    fetchDreamImgs();
  }, [requestActive]);

  useEffect(() => {
    if (dreamImgs?.length && requestActive) {
      setRequestActive(false);
    }
  }, [dreamImgs]);

  useEffect(() => {
    const fetchStripeClientSecret = async () => {
      const { data } = await axios.post("/api/createPaymentIntent");
      setStripeClientSecret(data.clientSecret);
      setStripePaymentIntentId(data.id);
    };

    if (stripeClientSecret.length === 0) fetchStripeClientSecret();
  }, []);

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mt="20px" w="80%">
        Dream your design
      </Text>

      <Stack direction="row" spacing={4} mt="5px" w="80%" alignItems="center">
        <Text fontSize="sm" as="i" color="blackAlpha.600">
          Start with a detailed description
        </Text>
        {!isMobile && (
          <Button size="xs" onClick={handleSurpriseMe}>
            Surprise me
          </Button>
        )}
      </Stack>

      {isMobile ? (
        <Box mt="20px" w="80%" boxShadow="md" borderRadius="5px">
          <Textarea
            size="lg"
            minH="110px"
            borderBottomRadius="0"
            value={dreamInput}
            onChange={(e) => setDreamInput(e.target.value)}
            w="100%"
            resize="none"
            m="0"
            fontSize="md"
          />
          <Button
            w="100%"
            colorScheme="white"
            size="lg"
            color="black"
            borderTopRadius="0"
            fontSize="md"
            onClick={handleSurpriseMe}
          >
            Surprise Me
          </Button>

          {/* <Button
            onClick={handleDesignCreation}
            w="100%"
            fontSize={inputFontSize}
            size={makeMyShirtButtonSize}
            mt="10px"
          >
            {dreamImgs.length ? "Try again!" : makeMyShirtButtonText}
          </Button> */}
        </Box>
      ) : (
        <InputGroup size="lg" mt="20px" maxW="80%" boxShadow="md">
          <Input
            placeholder={inputPlaceHolder}
            fontSize={inputFontSize}
            maxW="90%"
            bg="rgba(255, 255, 255, 0.8)"
            border="none"
            focusBorderColor="transparent"
            value={dreamInput}
            onChange={(e) => setDreamInput(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && dreamInput.length) {
                handleDesignCreation();
              }
            }}
          />
          <InputRightElement width="auto">
            <Button
              onClick={handleDesignCreation}
              bgColor={dreamInput === "" ? "transparent" : "blackAlpha.800"}
              borderLeft="1px solid grey"
              borderRadius="0"
              color={dreamInput === "" ? "blackAlpha.600" : "white"}
              h="100%"
              fontSize={inputFontSize}
              size={makeMyShirtButtonSize}
            >
              {dreamImgs.length ? "Try again!" : makeMyShirtButtonText}
            </Button>
          </InputRightElement>
        </InputGroup>
      )}

      {requestActive && (
        <Box maxW="80%" w="100%">
          <Progress
            w="100%"
            mt="40px"
            size="md"
            isIndeterminate
            colorScheme="cyan"
          />

          <Tip
            imgSrc={tip.imgSrc}
            tipText={tip.tipText}
            tipPrompt={tip.tipPrompt}
          />
        </Box>
      )}

      {dreamImgs?.length > 0 && (
        <Box
          display="grid"
          gridGap="2"
          gridTemplateColumns={dreamImagesGridTemplateColumns}
          maxW="80%"
          mt="40px"
          mb="40px"
        >
          {dreamImgs?.map((img, i) => (
            <Image
              key={i}
              src={img.url}
              border={
                !selectedImg || selectedImg !== img?.url ? "" : "2px solid cyan"
              }
              opacity={!selectedImg || selectedImg !== img?.url ? "1" : "0.7"}
              _hover={{ opacity: "0.7", border: "2px solid cyan" }}
              onClick={() => setSelectedImg(img.url)}
            />
          ))}
        </Box>
      )}

      {selectedImg && (
        <>
          <Text fontSize="2xl" fontWeight="bold" mb="5px" w="80%">
            Customize your t-shirt
          </Text>
          <Text fontSize="md" w="80%" as="i" color="blackAlpha.600" mb="20px">
            Choose your size and color
          </Text>
          <Box
            maxW="80%"
            w="100%"
            display="flex"
            flexDir={customizeShirtFlexDir}
          >
            <TShirtMockup
              w="80%"
              selectedImage={selectedImg}
              selectedColor={selectedColor}
            />
            <Box
              padding="20px"
              display="flex"
              flexDir="column"
              bgColor="blackAlpha.100"
            >
              <Text fontSize="m" fontWeight="bold">
                Color
              </Text>
              <ButtonGroup gap="4" pt="10px" pb="15px">
                {COLORS.map((color, i) => (
                  <Button
                    title={color.name}
                    key={`color-${color.name}-btn`}
                    bgColor={color.hex}
                    opacity={selectedColor === color.name ? "0.7" : "1"}
                    border={
                      selectedColor === color.name ? "2px solid cyan" : ""
                    }
                    w="40px"
                    h="40px"
                    borderRadius="50%"
                    onClick={() => setSelectedColor(color.name)}
                    focusBorderColor="transparent"
                    _hover={{ opacity: "0.7", border: "2px solid cyan" }}
                  />
                ))}
              </ButtonGroup>
              <Text fontSize="m" fontWeight="bold" mb="15px">
                Size
              </Text>
              <Box
                display="grid"
                gridTemplateColumns={sizesGridTemplateColumns}
                gap="15px"
                spacing="15px"
                mb="15px"
              >
                {SIZES.map((size, i) => (
                  <Button
                    title={`Size ${size}`}
                    key={`size-${size}-btn`}
                    bgColor={selectedSize === size ? "black" : "transparent"}
                    color={selectedSize === size ? "white" : "black"}
                    w="100%"
                    h="40px"
                    border="1px solid black"
                    borderRadius={0}
                    ml="0"
                    onClick={() => setSelectedSize(size)}
                    fontSize="sm"
                    _hover={{
                      bgColor: "black",
                      color: "white",
                      border: "none",
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </Box>
              <Text fontSize="m" fontWeight="bold" mb="15px">
                Quantity
              </Text>
              <Select
                onChange={(e) => setSelectedQuantity(e.target.value)}
                border="1px solid black"
                borderRadius="0"
              >
                {Array.from(Array(20).keys()).map((i) => (
                  <option key={`quantity-${i}`} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
        </>
      )}

      {selectedImg && selectedColor && selectedSize && stripeClientSecret && (
        <>
          <Text fontSize="2xl" fontWeight="bold" mb="20px" mt="20px" w="80%">
            Complete Your Purchase
          </Text>
          <Stack
            direction="row"
            justifyContent="space-between"
            padding="30px"
            bgColor="white"
            width="80%"
            mb="20px"
          >
            <Text
              fontWeight="bold"
              fontSize="md"
              w="80%"
              as="i"
              color="blackAlpha.800"
            >
              Would like to share your creation with the world?
            </Text>
            <Switch
              size="md"
              onChange={() => setShareCreation(!shareCreation)}
              isChecked={shareCreation}
            />
          </Stack>
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: stripeClientSecret,
              appearance: stripeAppearance,
              loader: "auto",
              business: {
                name: "Artefice",
              },
            }}
          >
            <CheckoutForm
              selectedImage={selectedImg}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              selectedQuantity={selectedQuantity}
              dreamInput={dreamInput}
              isShareable={shareCreation}
              affiliate={affiliate}
              paymentIntentId={stripePaymentIntentId}
            />
          </Elements>
        </>
      )}

      <Box maxW="80%" mt="40px" w="100%">
        <Text fontSize="2xl" fontWeight="bold" mb="20px" w="80%">
          Our Work
        </Text>
        <Slider images={CUSTOMER_IMAGES} />

        <Text fontSize="2xl" fontWeight="bold" mb="20px" w="80%">
          Recent Creations
        </Text>
        <Gallery
          images={images}
          setDreamInput={setDreamInput}
          handleDesignCreation={handleDesignCreation}
        />
      </Box>
    </>
  );
};

export default CreatePage;
