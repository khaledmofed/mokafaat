import { AboutPattern } from "@assets";
import moment from "moment";

const ContractHeader = () => {
  return (
    <section className="relative w-full bg-[#1D0843]  overflow-hidden min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-0 bg-primary opacity-30"></div>
      <div className="container relative pt-[100px] pb-8 px-2 mx-auto w-full text-center lg:pt-[100px] lg:pb-8 flex flex-col justify-center z-10">
        <div className="header grid lg:grid-cols-2 gap-4 text-white">
          <div
            dir="rtl"
            className="font-readex-pro order-1 text-right flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold underline underline-offset-8 font-arabic font-readex-pro">
              اتفاقية الشروط والأحكام
            </h3>
            <p className="font-arabic font-readex-pro">
              <strong className="font-arabic font-readex-pro">
                لقد تم الإتفاق بتاريخ : {moment().format("YYYY-MM-DD")}
              </strong>
              <br />
              بين كل من : <br />
              <strong className="font-arabic font-readex-pro">
                الطرف الأول :
              </strong>{" "}
              <span className="font-arabic font-readex-pro">
                شركة موردين القمة لتنظيم المعارض والمؤتمرات
              </span>{" "}
              <br />
              برقم السجل التجاري (1010924842)
            </p>
          </div>
          <div dir="ltr" className="order text-left flex flex-col gap-4">
            <h3 className="text-xl font-bold underline underline-offset-8">
              Terms And Conditions Agreement
            </h3>
            <p>
              <strong>
                Date of Agreement : {moment().format("YYYY-MM-DD")}
              </strong>
              <br />
              Between : <br />
              <strong>Party one :</strong> Top Suppliers Company <br />
              with commericial registertion number (1010924842)
            </p>
          </div>
        </div>
      </div>
      <div className={`absolute -bottom-10  transform z-9`}>
        <img
          src={AboutPattern}
          alt="App Pattern"
          className="w-full h-96 animate-float"
        />
      </div>
    </section>
  );
};

export default ContractHeader;
