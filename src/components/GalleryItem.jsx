import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import ImageItem from "./ImageItem";

const GalleryItem = ({ index, image, setDreamInput, handleDesignCreation }) => {
  const isLarge = index % 14 === 0 || index % 14 === 10;
  const isLargeMobile = index % 5 === 0;
  const spanDir = "span 2 / span 2";

  const pattern = useBreakpointValue({
    base: isLargeMobile,
    md: isLarge,
  });

  return pattern ? (
    <Box gridArea={spanDir}>
      <ImageItem
        image={image}
        setDreamInput={setDreamInput}
        handleDesignCreation={handleDesignCreation}
      />
    </Box>
  ) : (
    <ImageItem
      image={image}
      setDreamInput={setDreamInput}
      handleDesignCreation={handleDesignCreation}
    />
  );
};

export default GalleryItem;
