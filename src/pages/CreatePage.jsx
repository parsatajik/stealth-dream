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
  useToast,
} from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import TShirtMockup from "../components/TShirtMockUp";
import Gallery from "../components/Gallery";
import StyleCustomizer from "../components/StyleCustomizer";
import mixpanel from "mixpanel-browser";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { COLORS, SIZES, SURPRISE_ME_PROMPTS, TSHIRT_COST } from "../constants";
import { Helmet } from "react-helmet";

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const stripeAppearance = {
  theme: "stripe",
};

const purchasesQuery = query(
  collection(db, "purchases"),
  where("isShareable", "==", true),
  orderBy("date", "desc"),
  limit(28)
);

const purchaseListQuery = {
  queryKey: ["purchases"],
  queryFn: () => getDocs(purchasesQuery),
  staleTime: 1000 * 60 * 5, // 5 minutes
  cacheTime: 1000 * 60 * 60 * 24, // 24 hours
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    let data = queryClient.getQueryData(purchaseListQuery.queryKey);
    if (!data) {
      data = await queryClient.fetchQuery(purchaseListQuery);
    }

    const purchasesImages = data.docs.map((doc) => ({
      url: doc.data().webpUrl,
      alt: doc.data().prompt,
    }));

    return { images: purchasesImages };
  };

const CreatePage = () => {
  const [dreamInput, setDreamInput] = useState("");
  const [requestActive, setRequestActive] = useState(false);
  const [dreamImgs, setDreamImgs] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [stripeClientSecret, setStripeClientSecret] = useState("");
  const [stripePaymentIntentId, setStripePaymentIntentId] = useState("");
  const [shareCreation, setShareCreation] = useState(true);
  const [totalOrderCost, setTotalOrderCost] = useState(TSHIRT_COST);
  const [selectedArtStyle, setSelectedArtStyle] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedTexture, setSelectedTexture] = useState("");
  const [text, setText] = useState("");
  const [expandedAccordionIndices, setExpandedAccordionIndices] = useState([0]);
  const [dalleVersion, setDalleVersion] = useState("dall-e-2");

  const loaderData = useLoaderData();
  const toast = useToast();
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

  const isSearchAllowed = () => {
    const today = new Date().toDateString();
    const searchHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "{}"
    );

    if (searchHistory.date !== today) {
      localStorage.setItem(
        "searchHistory",
        JSON.stringify({ date: today, count: 1 })
      );
      return true;
    } else if (searchHistory.count < 20) {
      localStorage.setItem(
        "searchHistory",
        JSON.stringify({ ...searchHistory, count: searchHistory.count + 1 })
      );
      return true;
    }

    toast({
      title: "Search limit reached",
      description:
        "You have reached your search limit for today. Please try again tomorrow.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    return false;
  };

  const dreamFinalizer = (dream) => {
    let prompt = dream;
    if (selectedArtStyle) prompt += `, in the stlye of ${selectedArtStyle}`;
    if (selectedArtist) prompt += `, by ${selectedArtist}`;
    if (selectedTexture) prompt += `, ${selectedTexture}`;
    return prompt;
  };

  const fetchImage = async (dream) => {
    try {
      const prompt = dreamFinalizer(dream);

      const response = await axios.post(
        `/api/generateImage`,
        {
          dream: prompt,
          dalleVersion,
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

      return response.data.map((img) => img.url);
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description:
          "An error occurred while generating your images. Make sure that your prompt adheres to our guidelines.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setRequestActive(false);
    }
  };

  const handleDesignCreation = async () => {
    try {
      if (!requestActive && isSearchAllowed()) {
        setDreamImgs([]);
        setRequestActive(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSurpriseMe = () => {
    setDreamInput(getRandomElement(SURPRISE_ME_PROMPTS));
  };

  const handleRightClick = (e) => {
    e.preventDefault();
  };

  const updatePaymentIntentAmount = async () => {
    try {
      const res = await axios.post(`/api/updatePaymentIntent`, {
        paymentIntentId: stripePaymentIntentId,
        params: {
          amount: totalOrderCost * 100,
        },
      });

      console.log(res.data);
    } catch (err) {
      console.error("An error occurred while sending the payment receipt.");
      console.error(err);
    }
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
      setExpandedAccordionIndices([]);
    }
  }, [dreamImgs]);

  useEffect(() => {
    const fetchStripeClientSecret = async () => {
      const { data } = await axios.post("/api/createPaymentIntent", {
        totalOrderCost,
      });
      setStripeClientSecret(data.clientSecret);
      setStripePaymentIntentId(data.id);
    };

    if (stripeClientSecret.length === 0) fetchStripeClientSecret();
  }, []);

  useEffect(() => {
    setTotalOrderCost(selectedQuantity * TSHIRT_COST);
  }, [selectedQuantity]);

  useEffect(() => {
    if (totalOrderCost > 0 && stripeClientSecret.length > 0) {
      updatePaymentIntentAmount();
    }
  }, [totalOrderCost]);

  return (
    <>
      <Helmet>
        <title>Shop Unique AI-Infused T-Shirts - Artefice</title>
        <meta
          name="description"
          content="Explore our collection of unique, AI-infused t-shirts. Each piece is a one-of-a-kind expression of creativity and individuality."
        />
      </Helmet>
      <Text fontSize="2xl" fontWeight="bold" mt="20px" w="80%">
        Dream your design
      </Text>

      <Stack direction="row" spacing={4} mt="5px" w="80%" alignItems="center">
        <Text fontSize="sm" as="i" color="blackAlpha.600">
          Start with a detailed description
        </Text>
        {!isMobile && (
          <>
            <Button size="xs" onClick={handleSurpriseMe}>
              Surprise me
            </Button>
          </>
        )}

        <Select
          size="xs"
          onChange={(e) => setDalleVersion(e.target.value)}
          borderRadius="5px"
          w="fit-content"
          bgColor="gray.100"
          border="none"
          fontWeight="bold"
        >
          <option value="dall-e-2">dall-e-2</option>
          <option value="dall-e-3">dall-e-3</option>
        </Select>
      </Stack>

      {isMobile ? (
        <Box mt="20px" w="80%" boxShadow="md" borderRadius="5px">
          <Textarea
            size="lg"
            minH="130px"
            fontSize="sm"
            borderBottomRadius="0"
            placeholder="Describe your dream... It could be anything from a person to a place to a feeling to a concept. The more detail the better!"
            onKeyDown={async (e) => {
              if (e.key === "Enter" && dreamInput.length) {
                handleDesignCreation();
              }
            }}
            value={dreamInput}
            onChange={(e) => setDreamInput(e.target.value)}
            w="100%"
            resize="none"
            m="0"
          />
          <Button
            w="100%"
            colorScheme="white"
            size="lg"
            color="black"
            borderTopRadius="0"
            fontSize="md"
            onClick={
              dreamInput.length ? handleDesignCreation : handleSurpriseMe
            }
          >
            {dreamInput.length ? "Make My Shirt!" : "Surprise Me!"}
          </Button>
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
              {dreamImgs?.length ? "Try again!" : makeMyShirtButtonText}
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
        </Box>
      )}

      {dreamImgs?.length > 0 && (
        <Box
          display="grid"
          gridGap="2"
          gridTemplateColumns={dreamImagesGridTemplateColumns}
          maxW="80%"
          mt="40px"
          mb="20px"
        >
          {dreamImgs?.map((img, i) => (
            <Image
              key={i}
              src={img}
              border={
                !selectedImg || selectedImg !== img ? "" : "2px solid cyan"
              }
              opacity={!selectedImg || selectedImg !== img ? "1" : "0.7"}
              _hover={{ opacity: "0.7", border: "2px solid cyan" }}
              onClick={() => setSelectedImg(img)}
              onContextMenu={handleRightClick}
              alt={`AI Dream Image ${i}`}
            />
          ))}
        </Box>
      )}

      <StyleCustomizer
        selectedArtStyle={selectedArtStyle}
        setSelectedArtStyle={setSelectedArtStyle}
        selectedArtist={selectedArtist}
        setSelectedArtist={setSelectedArtist}
        selectedTexture={selectedTexture}
        setSelectedTexture={setSelectedTexture}
        expandedAccordionIndices={expandedAccordionIndices}
        setExpandedAccordionIndices={setExpandedAccordionIndices}
      />

      {selectedImg && (
        <>
          <Text fontSize="2xl" fontWeight="bold" mt="20px" mb="5px" w="80%">
            Customize your t-shirt
          </Text>
          <Text fontSize="md" w="80%" as="i" color="blackAlpha.600" mb="20px">
            Choose your size and color
          </Text>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
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
              text={text}
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
              <Text fontSize="m" fontWeight="bold">
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
          <Box
            bgColor="blackAlpha.800"
            color="white"
            mt="25px"
            p="20px"
            w="80%"
          >
            <Text fontSize={inputFontSize} textAlign="center" fontWeight="bold">
              Our clothes are made to represent you. You are elegant. You are
              creative. You deserve the best quality. Remember, Artefice is You.
              We are The Makers.
            </Text>
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
              Would you like to share your creation with the world?
            </Text>
            <Switch
              size="md"
              onChange={() => setShareCreation(!shareCreation)}
              isChecked={shareCreation}
              colorScheme="cyan"
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
              paymentIntentId={stripePaymentIntentId}
              totalOrderCost={totalOrderCost}
              setTotalOrderCost={setTotalOrderCost}
            />
          </Elements>
        </>
      )}

      <Box maxW="80%" mt="40px" w="100%">
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
