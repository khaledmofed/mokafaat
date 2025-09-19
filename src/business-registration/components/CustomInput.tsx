import { BusinessRegistrationCustomInputProps } from "@business-registration/interfaces/custom-input.props";

const BusinessRegistrationCustomInput = ({
  value,
  placeholder,
  type = "text",
  error,
  className,
  onValueChange,
}: BusinessRegistrationCustomInputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={`h-12 rounded-md border border-gray-200 bg-gray-50 px-4 w-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
        onChange={(e) => onValueChange(e.target.value)}
      />

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default BusinessRegistrationCustomInput;
