import { useIsRTL } from "@hooks";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const PhoneNumberInput: React.FC<{
  control: any;
  name: string;
  label: string;
  error?: string;
  dir?: "ltr" | "rtl";
}> = ({ control, name, label, error, dir = "ltr" }) => {
  const isRTL = useIsRTL();
  return (
    <div
      className={`input-group wow fadeInUp mt-3 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={dir}
    >
      <label
        className={`text-sm text-title font-bold capitalize ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "Mobile Number Is Required" }}
        render={({ field }) => (
          <PhoneInput
            country={"sa"}
            value={field.value}
            onChange={(value) => field.onChange(value)}
            inputClass={`border-0 !w-full px-0 text-sm !border-[#e5e7eb] h-12 ${
              dir === "rtl" ? "pr-3" : "pl-3"
            }`}
            placeholder={
              dir === "rtl" ? "+966 5XXX XXX XX" : "+966 5XXX XXX XX"
            }
            enableSearch={true}
            disableSearchIcon={true}
            containerClass={dir === "rtl" ? "rtl-phone-input" : ""}
          />
        )}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default PhoneNumberInput;
