import { FaPlay } from "react-icons/fa";
import aboutContentImg from "@assets/images/about-content-img.png";
import { useIsRTL } from "@hooks";
import { useState, useRef } from "react";
import { MukafaatVideo } from "@assets";

const AboutVideo = ({
  arDescription,
  enDescription,
}: {
  arDescription: string;
  enDescription: string;
}) => {
  const isRTL = useIsRTL();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log("AboutVideo rendered with:", {
    arDescription,
    enDescription,
    isRTL,
  });

  const toggleVideo = () => {
    console.log("Play Video clicked!");
    console.log("Current state:", isVideoPlaying);

    // تشغيل الفيديو
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsVideoPlaying(true);

    console.log("Video will start playing");
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Video Section */}
        <div className="mb-20">
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Video Container */}
            <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-md">
              {/* About Content Image - Hidden when video is playing */}
              <img
                src={aboutContentImg}
                alt="About Mukafaat Content"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoPlaying ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Video - Shown when playing */}
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoPlaying ? "opacity-100" : "opacity-0"
                }`}
                controls={true}
                onEnded={() => {
                  console.log("Video ended, returning to image");
                  setIsVideoPlaying(false);
                }}
                onPause={() => {
                  console.log("Video paused");
                  setIsVideoPlaying(false);
                }}
                onPlay={() => {
                  console.log("Video started playing");
                  setIsVideoPlaying(true);
                }}
              >
                <source src={MukafaatVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Resume Button - Only visible when video is paused */}
              {!isVideoPlaying &&
                videoRef.current &&
                videoRef.current.currentTime > 0 && (
                  <button
                    onClick={toggleVideo}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer z-10 transition-all duration-300"
                    aria-label="Resume video"
                    type="button"
                  >
                    <div className="w-20 h-20 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                      <FaPlay className="text-white text-2xl ml-1" />
                    </div>
                  </button>
                )}

              {/* Play Button - Only visible when video is not playing and no progress */}
              {!isVideoPlaying &&
                (!videoRef.current || videoRef.current.currentTime === 0) && (
                  <button
                    onClick={toggleVideo}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer z-10 transition-all duration-300"
                    aria-label="Play video"
                    type="button"
                  >
                    <div className="w-20 h-20 bg-[#fd671a] hover:bg-purple-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                      <FaPlay className="text-white text-2xl ml-1" />
                    </div>
                  </button>
                )}

              {/* Video Overlay - Hidden when video is playing */}
              {!isVideoPlaying && (
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </div>
          </div>
        </div>

        {/* Text Description Section */}
        <div className="gap-12 items-start">
          <div className="space-y-6 container mx-auto mb-4  flex-mobile">
            {/* Subtitle */}
            <div
              className={`flex justify-start items-start gap-8 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-1/3 flex-mobile-w ${
                  isRTL ? "text-right" : "text-left"
                } ${isRTL ? "order-2" : "order-1"}`}
              >
                <span className="text-[#fd671a] text-md lg:text-3xl font-semibold">
                  {isRTL ? "حول" : "About"}
                </span>

                {/* Main Heading */}
                <h2 className="font-size-mobile-heading  text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {isRTL ? "إيفنت ماستر" : "Mukafaat"}
                </h2>
              </div>

              {/* Description */}
              <p
                className={`flex-mobile-w text-gray-600 text-md leading-relaxed w-2/3 ${
                  isRTL ? "text-right" : "text-left"
                } ${isRTL ? "order-1" : "order-2"}`}
              >
                {isRTL ? arDescription : enDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVideo;
