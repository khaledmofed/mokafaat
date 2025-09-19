import { Loading, LogoLight } from "@assets";
import { ReactSVG } from "react-svg";

const Splash = () => {
  return (
    <div className="splash-page flex flex-col gap-10 w-full h-dvh items-center justify-center">
      <img src={LogoLight} className="wow fadeInUp max-w-40" />
      <ReactSVG src={Loading} className="wow fadeInUp" />
    </div>
  );
};

export default Splash;
