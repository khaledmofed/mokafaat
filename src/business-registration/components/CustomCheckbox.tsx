import { BusinessCustomCheckboxProps } from "@business-registration/interfaces/business-custom-checkbox.props";

const BusinessRegistrationCustomCheckbox = ({
  options,
  selectedValues,
  onChange,
  title,
  error,
}: BusinessCustomCheckboxProps) => {
  const handleOptionToggle = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(newSelectedValues);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white font-medium mb-3">{title}</h2>

      <div className="flex items-center flex-wrap gap-4 text-sm">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);

          return (
            <button
              key={option.id}
              onClick={() => handleOptionToggle(option.value)}
              className={`
                  relative px-6 py-4 rounded-full font-medium
                  transition-all duration-150 ease-in-out
                  border-1 border-white/20 bg-[#fd671a2b]
                  ${
                    isSelected
                      ? "bg-white/60 border-white/40 shadow-lg text-primary"
                      : "bg-white/10 text-white "
                  }
                `}
            >
              <span className="relative z-10">{option.label}</span>
            </button>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default BusinessRegistrationCustomCheckbox;
