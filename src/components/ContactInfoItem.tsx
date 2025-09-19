import { ContactInfoItemProps } from "@interfaces";
import { Link } from "react-router-dom";

const ContactInfoItem = (props: ContactInfoItemProps) => {
  return (
    <Link to={props.to} className="flex items-center gap-2 pe-2">
      <props.icon />
      <span dir="ltr">{props.text}</span>
    </Link>
  );
};

export default ContactInfoItem;
