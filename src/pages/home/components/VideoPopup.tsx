import React, { useRef } from "react";
import { MukafaatVideo } from "@assets";
import { IoMdClose } from "react-icons/io";
import { VideoPopupProps } from "@interfaces/VideoPopupProps";

const VideoPopup: React.FC<VideoPopupProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log("VideoPopup rendered with:", { isOpen, onClose });

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity opacity-100"
      onClick={handleOverlayClick}
    >
      <button
        className="absolute top-4 right-4 text-2xl text-primary bg-white rounded-full p-2 cursor-pointer"
        onClick={handleClose}
      >
        <IoMdClose />
      </button>
      <div className="relative max-w-4xl w-full mx-4">
        <video
          ref={videoRef}
          className="w-full rounded-lg"
          controls
          autoPlay
          onClick={(e) => e.stopPropagation()}
          onError={(e) => console.error("Video error:", e)}
          onLoadStart={() => console.log("Video loading started")}
          onCanPlay={() => console.log("Video can play")}
        >
          <source src={MukafaatVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPopup;
