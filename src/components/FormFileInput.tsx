import { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { FormFileInputProps } from "@interfaces";
import ErrorMessage from "./ErrorMessage";

const FormFileInput: React.FC<FormFileInputProps> = ({
  label,
  onFileChange,
  error,
  id,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileName(file.name);
      onFileChange(file);
    } else {
      setFileName("");
      onFileChange(null);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-between border border-gray-200 bg-gray-50 rounded-md lg:px-4 p-4 mt-2 cursor-pointer wow fadeInUp hover:bg-gray-100"
        data-wow-delay="0.2s"
        onClick={handleButtonClick}
      >
        <label
          className="text-sub-title text-sm uppercase"
          htmlFor={id || "file"}
        >
          {fileName ? fileName : label}
        </label>
        <input
          id={id || "file"}
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="flex items-center">
          <MdOutlineFileUpload className="text-sub-title text-lg" />
        </div>
      </div>
      <ErrorMessage message={error || ""} />
    </>
  );
};

export default FormFileInput;
