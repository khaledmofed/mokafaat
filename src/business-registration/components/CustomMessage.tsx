import { IoMdClose } from "react-icons/io";

const BusinessRegistrationCustomMessage = (props: {
  message: string;
  type?: "success" | "danger";
  onClose: () => void;
}) => {
  return (
    <div
      className={`p-3 bg-${props.type} mt-8 rounded-md text-sm flex items-center justify-between`}
    >
      <span style={{ fontWeight: 500, color: "#fff" }}>{props.message}</span>

      <button
        className="me-4 text-white hover:text-gray-300"
        onClick={props.onClose}
      >
        <IoMdClose />
      </button>
    </div>
  );
};

export default BusinessRegistrationCustomMessage;
