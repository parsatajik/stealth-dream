import { Box, Image, chakra, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const timeoutRef = useRef(null);

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "repeat(3, 1fr)",
  });

  const numberOfPictures = useBreakpointValue({
    base: 1,
    md: 3,
  });

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setFade(true);

    setTimeout(() => {
      setFade(false);
      setCurrentIndex((prevIndex) =>
        prevIndex + numberOfPictures >= images.length - 1
          ? 0
          : prevIndex + numberOfPictures
      );
    }, 1000);
  };

  // Automatically go to the next slide every 4 seconds
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 4000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  return (
    <Box
      w="100%"
      h="auto"
      display="grid"
      gridTemplateColumns={gridTemplateColumns}
      gap="10px"
      mb="20px"
    >
      {images
        .slice(currentIndex, currentIndex + numberOfPictures)
        .map((img, index) => (
          <Box key={index} maxH="400px">
            <chakra.div
              width="100%"
              height="100%"
              transition="opacity 1s"
              opacity={fade ? 0 : 1}
            >
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </chakra.div>
          </Box>
        ))}
    </Box>
  );
};

export default Slider;
