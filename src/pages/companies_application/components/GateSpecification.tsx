import { GateSpecificationProps } from "@interfaces";
import { t } from "i18next";

const GateSpecification = ({
  gateName,
  gateData,
  onGateDataChange,
}: GateSpecificationProps) => {
  const handleIncrement = (role: string) => {
    onGateDataChange({
      ...gateData,
      [role]: (gateData[role] || 0) + 1,
    });
  };

  const handleDecrement = (role: string) => {
    if ((gateData[role] || 0) > 0) {
      onGateDataChange({
        ...gateData,
        [role]: (gateData[role] || 0) - 1,
      });
    }
  };

  return (
    <div className="border bg-gray-50 p-4 rounded-lg">
      <h3 className="font-bold mb-2">{`${t(
        "company-application.gate"
      )} ${gateName}`}</h3>

      <input
        type="text"
        value={gateData.gateName || ""}
        onChange={(e) =>
          onGateDataChange({ ...gateData, gateName: e.target.value })
        }
        placeholder={t("company-application.gate-name")}
        className="w-full p-3 mb-2 border rounded-lg text-sm"
      />

      <div className="grid grid-cols-2 gap-4">
        {[
          "supervisor",
          "scanner",
          "soft-check",
          "tech-support",
          "cashier",
          "logistics",
          "host",
          "project-manager",
          "operation-supervisor",
          "game-operator",
        ].map((role) => {
          const roleKey = role.toLowerCase().replace(/ /g, "");
          return (
            <div key={role} className="flex flex-col mb-2">
              <label className="block mb-1 text-sm font-medium">
                {t(`company-application.${role}`)}
              </label>
              <div className="flex items-center border rounded-lg">
                <button
                  type="button"
                  onClick={() => handleDecrement(roleKey)}
                  className="p-3 text-white hover:bg-secondary rounded-s-md
                   bg-primary transition-all"
                >
                  -
                </button>
                <input
                  type="number"
                  value={gateData[roleKey] || ""}
                  onChange={(e) =>
                    onGateDataChange({
                      ...gateData,
                      [roleKey]: e.target.valueAsNumber,
                    })
                  }
                  placeholder={`${t(`company-application.number-of`)} ${t(
                    `company-application.${role}`
                  )}`}
                  className="w-full p-3 border-t border-b text-sm text-center"
                />
                <button
                  type="button"
                  onClick={() => handleIncrement(roleKey)}
                  className="p-3 text-white hover:bg-secondary rounded-e-md
                   bg-primary transition-all"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GateSpecification;
