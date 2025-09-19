import { ContractModel } from "@entities";
import { getName } from "country-list";

const EmployeeSection = (props: { contract: ContractModel }) => {
  const { contract } = props;

  return (
    <section className="employee grid lg:grid-cols-2 gap-4">
      <div
        dir="rtl"
        className="font-arabic font-readex-pro order-1 text-right flex flex-col gap-4"
      >
        <strong className="font-arabic font-readex-pro">الطرف الثاني :</strong>
        <div className="border border-gray-500 flex flex-col font-semibold">
          <span className="border-b border-gray-500 p-2">
            الإسم : {contract.user.fullName}
          </span>
          <span className="border-b border-gray-500 p-2">
            الجنسية : {getName(contract.user.nationality)}
          </span>
          <span className="border-b  border-gray-500 p-2">
            المدينة : {contract.user.city.arName}
          </span>
          <span className="p-2">رقم الهاتف : {contract.user.mobileNumber}</span>
        </div>
      </div>

      <div dir="ltr" className="order text-left flex flex-col gap-4">
        <strong>Party Two :</strong>

        <div className="border border-gray-500 flex flex-col font-semibold">
          <span className="border-b border-gray-500 p-2">
            Name : {contract.user.fullName}
          </span>
          <span className="border-b border-gray-500 p-2">
            Nationality : {getName(contract.user.nationality)}
          </span>
          <span className="border-b  border-gray-500 p-2">
            City: {contract.user.city.enName}
          </span>
          <span className="p-2">
            Mobile Number : {contract.user.mobileNumber}
          </span>
        </div>
      </div>
    </section>
  );
};

export default EmployeeSection;
