import React, { useRef, useEffect } from "react";
import TSHIRT from "../assets/ai-t-shirt.png";
import WHITE_TSHIRT from "../assets/white-shirt.jpg";

function TShirtMockup({ selectedImage, selectedColor }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      const tshirtImg = new Image();
      tshirtImg.src = selectedColor === "white" ? WHITE_TSHIRT : TSHIRT;

      tshirtImg.onload = () => {
        // set canvas dimensions
        canvas.width = containerRef.current.offsetWidth;
        const aspectRatio = tshirtImg.width / tshirtImg.height;
        canvas.height = canvas.width / aspectRatio;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tshirtImg, 0, 0, canvas.width, canvas.height);

        // if design image selected, draw it
        if (selectedImage) {
          const designImg = new Image();
          designImg.src = selectedImage;
          designImg.onload = () => {
            // calculate scale and position for design image
            const designScale = Math.min(
              canvas.width / 2.7 / designImg.width,
              canvas.height / 2.7 / designImg.height
            );
            const dx = canvas.width / 2 - (designImg.width * designScale) / 2;
            const dy = canvas.height / 2 - (designImg.height * designScale) / 2;
            ctx.drawImage(
              designImg,
              dx,
              dy,
              designImg.width * designScale,
              designImg.height * designScale
            );
          };
        }
      };
    };

    // initial sizing
    updateSize();

    // add resize event listener
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [selectedImage, selectedColor]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
}

export default TShirtMockup;
