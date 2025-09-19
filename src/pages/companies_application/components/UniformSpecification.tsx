import FormFileInput from "@components/FormFileInput";
import { UniformSpecificationProps } from "@interfaces";
import { t } from "i18next";

const UniformSpecification = ({
  uniformQty,
  onUniformDesignChange,
  onUniformQtyChange,
}: UniformSpecificationProps) => {
  const handleIncrement = () => {
    onUniformQtyChange((uniformQty || 0) + 1);
  };

  const handleDecrement = () => {
    if ((uniformQty || 0) > 0) {
      onUniformQtyChange((uniformQty || 0) - 1);
    }
  };

  return (
    <div className="flex flex-col border rounded-lg">
      <h1 className="font-bold border-b p-4 bg-gray-50 rounded-tr-lg rounded-tl-lg">
        {t("company-application.uniform-specification")}
      </h1>

      <div className="grid lg:grid-cols-2 gap-2 p-4">
        <div className="input-group wow fadeInUp" data-wow-delay="0.2s">
          <label
            htmlFor="uniform-qty"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.uniform-qty")}
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
              id="uniform-qty"
              value={uniformQty ? uniformQty : ""}
              onChange={(e) => {
                const value = e.target.value;
                const parsedValue = parseInt(value);
                if (parsedValue >= 0 || value === "") {
                  onUniformQtyChange(parsedValue);
                }
              }}
              placeholder={t("company-application.uniform-qty")}
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
            htmlFor="uniform-design"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.uniform-design")}
          </label>

          <FormFileInput
            label={t("company-application.uniform-design")}
            onFileChange={onUniformDesignChange}
            error={null}
            id="uniform-design"
          />
        </div>
      </div>
    </div>
  );
};

export default UniformSpecification;
