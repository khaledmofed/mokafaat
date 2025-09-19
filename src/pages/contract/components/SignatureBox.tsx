import React, { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface SignatureBoxProps {
  signatureURL: string | null;
  onSignatureURLChange: (value: string | null) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setSignatureValid: (isValid: boolean) => void;
}

const SignatureBox: React.FC<SignatureBoxProps> = ({
  signatureURL,
  onSignatureURLChange,
  canvasRef,
  setSignatureValid,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const hasDrawn = useRef(false);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
      };
    }
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { offsetX, offsetY } = getCoordinates(e);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    // Prevent scrolling on mobile
    document.body.style.overflow = "hidden";
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    if ("touches" in e) e.preventDefault();

    const { offsetX, offsetY } = getCoordinates(e);
    context.lineTo(offsetX, offsetY);
    context.stroke();
    hasDrawn.current = true;
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn.current) return;

    const context = canvas.getContext("2d");
    if (context) context.closePath();

    setIsDrawing(false);
    onSignatureURLChange(canvas.toDataURL());
    setSignatureValid(true);

    // Restore scrolling on mobile
    document.body.style.overflow = "auto";
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (context) context.clearRect(0, 0, canvas.width, canvas.height);

    onSignatureURLChange(null);
    setSignatureValid(false);
    hasDrawn.current = false;

    // Restore scrolling on mobile
    document.body.style.overflow = "auto";
  };

  // const handleOutsideClick = (e: MouseEvent) => {
  //   const canvas = canvasRef.current;
  //   if (canvas && !canvas.contains(e.target as Node)) {
  //     stopDrawing();
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDrawing) {
        e.preventDefault(); // Prevent scrolling while drawing
      }
    };

    // Add touchmove event listener
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      // Cleanup
      document.removeEventListener("touchmove", handleTouchMove);
      // Restore scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, [isDrawing]);

  return (
    <div className="relative max-w-screen-md mx-auto border-2 border-dashed border-primary rounded-lg shadow-md mb-4">
      {!signatureURL && (
        <h6 className="absolute top-3 start-3 font-readex-pro text-sm">
          Sign Here وقع هنا
        </h6>
      )}
      <canvas
        ref={canvasRef}
        width={350}
        height={200}
        className="w-full h-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button
        onClick={clearCanvas}
        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        <FaRegTrashAlt />
      </button>
    </div>
  );
};

export default SignatureBox;
