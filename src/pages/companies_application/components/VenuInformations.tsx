import FormFileInput from "@components/FormFileInput";
import { VenuInformationsProps } from "@interfaces";
import { t } from "i18next";
import GateSpecification from "./GateSpecification";

const VenuInformations = ({
  gatesNumber,
  onGatesNumberChangeChange,
  onVenueMapChange,
  gatesData,
  onGateDataChange,
}: VenuInformationsProps) => {
  const handleOnGatesNumberChange = (number: string | null) => {
    if (number) {
      onGatesNumberChangeChange(number);
    }
  };

  const handleGateDataChange = (index: number, newGateData: any) => {
    onGateDataChange(index, newGateData);
  };

  const handleIncrement = () => {
    const newNumber = Math.max(0, (parseInt(gatesNumber) || 0) + 1);
    handleOnGatesNumberChange(newNumber.toString());
  };

  const handleDecrement = () => {
    const newNumber = Math.max(0, (parseInt(gatesNumber) || 0) - 1);
    handleOnGatesNumberChange(newNumber.toString());
  };

  const gates = Array.from({ length: parseInt(gatesNumber) || 0 });

  return (
    <div className="flex flex-col border rounded-lg">
      <h1 className="font-bold border-b bg-gray-50 p-4 rounded-tr-lg rounded-tl-lg">
        {t("company-application.event-venu-details")}
      </h1>

      <div className="grid lg:grid-cols-2 gap-2 p-4">
        <div className="input-group wow fadeInUp" data-wow-delay="0.2s">
          <label
            htmlFor="gates-number"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.gates-number")}
          </label>
          <div className="flex items-center border rounded-lg mt-3.5">
            <button
              type="button"
              onClick={handleDecrement}
              className="p-3.5 text-white hover:bg-secondary bg-primary rounded-s-md"
            >
              -
            </button>
            <input
              type="number"
              id="gates-number"
              value={gatesNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value) >= 0 || value === "") {
                  handleOnGatesNumberChange(value);
                }
              }}
              placeholder={t("company-application.gates-number")}
              className="p-4 text-center w-full text-sm"
            />
            <button
              type="button"
              onClick={handleIncrement}
              className="p-3.5 text-white hover:bg-secondary bg-primary rounded-e-md"
            >
              +
            </button>
          </div>
        </div>

        <div
          className="input-group wow fadeInUp flex flex-col gap-2"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="venue-map"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.venue-map")}
          </label>

          <FormFileInput
            label={t("company-application.venue-map")}
            onFileChange={onVenueMapChange}
            error={null}
            id="company-application-venue-map"
          />
        </div>
      </div>

      <div
        className={`${
          gates.length > 0 ? "grid lg:grid-cols-2 gap-2 p-4" : "hidden"
        }`}
      >
        {gates.map((_, index) => (
          <GateSpecification
            key={index}
            gateName={`${index + 1}`}
            gateData={gatesData[index] || {}}
            onGateDataChange={(newGateData) =>
              handleGateDataChange(index, newGateData)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default VenuInformations;
