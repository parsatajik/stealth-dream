import React, { useRef, useEffect, useState } from "react";
import TSHIRT from "../assets/ai-t-shirt.png";
import WHITE_TSHIRT from "../assets/white_tshirt.png";

function TShirtMockup({ selectedImage, selectedColor }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || !selectedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const tshirtImg = new Image();
    tshirtImg.src = selectedColor === "white" ? WHITE_TSHIRT : TSHIRT;

    tshirtImg.onload = () => {
      const aspectRatio = tshirtImg.width / tshirtImg.height;

      canvas.width = dimensions.width;
      canvas.height = dimensions.width / aspectRatio;

      ctx.drawImage(tshirtImg, 0, 0, canvas.width, canvas.height);

      const designImg = new Image();
      designImg.src = selectedImage;

      designImg.onload = () => {
        const scale = Math.min(
          canvas.width / 2.7 / designImg.width,
          canvas.height / 2.7 / designImg.height
        );

        const x = canvas.width / 2 - (designImg.width * scale) / 2;
        const y = canvas.height / 2 - (designImg.height * scale) / 2;

        ctx.drawImage(
          designImg,
          x,
          y,
          designImg.width * scale,
          designImg.height * scale
        );
      };
    };
  }, [selectedImage, dimensions, selectedColor]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
}

export default TShirtMockup;
