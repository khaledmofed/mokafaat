import { Link } from "react-router-dom";

const SocialMediaButton = (props: any) => {
  return (
    <Link
      to={props.to}
      target="_blank"
      className="border p-1 rounded-md hover:bg-white hover:text-primary transition duration-300"
    >
      <props.icon />
    </Link>
  );
};

export default SocialMediaButton;
