import { ContractModel } from "@entities";

const ContractFooter = (props: { contract: ContractModel }) => {
  const { contract } = props;
  return (
    <section className="footer grid lg:grid-cols-2 gap-4 my-4">
      <div
        dir="rtl"
        className=" font-arabic font-readex-pro order-1 text-right flex flex-col gap-3"
      >
        <strong className="text-lg font-arabic font-readex-pro">
          الطرف الأول:
        </strong>
        <span className="underline underline-offset-8 text-lg">
          شركة موردين القمة لتنظيم المعارض والمؤتمرات
        </span>

        <strong className="text-lg font-arabic font-readex-pro">
          الطرف الثاني:
        </strong>
        <span className="underline underline-offset-8 text-lg">
          {contract.user.fullName}
        </span>
      </div>
      <div dir="ltr" className="order text-left flex flex-col gap-3">
        <strong className="text-lg">FIRST PARTY:</strong>
        <span className="underline underline-offset-8 text-lg">
          Top Suppliers Company
        </span>

        <strong className="text-lg">SECOND PARTY:</strong>
        <span className="underline underline-offset-8 text-lg">
          {contract.user.fullName}
        </span>
      </div>
    </section>
  );
};

export default ContractFooter;
