import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import GalleryItem from "./GalleryItem";

const Gallery = ({ images, setDreamInput, handleDesignCreation }) => {
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(5, 1fr)",
  });

  return (
    <Box
      display="grid"
      gridGap="2"
      gridTemplateColumns={gridTemplateColumns}
      mb="100px"
    >
      {images?.map((image, index) => (
        <GalleryItem
          key={index}
          index={index}
          image={image}
          setDreamInput={setDreamInput}
          handleDesignCreation={handleDesignCreation}
        />
      ))}
    </Box>
  );
};

export default Gallery;
