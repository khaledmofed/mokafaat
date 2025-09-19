import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ContractContent,
  ContractFooter,
  ContractHeader,
  EmployeeSection,
  SignatureBox,
} from "./components";
import {
  ChangePageTitle,
  LoadingSpinner,
  SignContractButton,
} from "@components";
import { t } from "i18next";
import { APP_ROUTES } from "@constants";
import { toast } from "react-toastify";
import { useCreateContractFile, useGetContract, useIsRTL } from "@hooks";
import { OurAppPattern2 } from "@assets";
import { GetStarted } from "@pages/home/components";
import ContractHeroNotFound from "./components/ContractHeroNotFound";

const ContractPage: React.FC = () => {
  ChangePageTitle({
    pageTitle: t("contract.title"),
  });
  const [signatureURL, setSignatureURL] = useState<string | null>(null);
  const { contractId } = useParams<{ contractId: string }>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSignuterValid, setIsSignuterValid] = useState(false);
  const navigate = useNavigate();
  const { contractData, isLoading } = useGetContract(contractId || "");
  const {
    isCreateOn,
    setIsCreateOn,
    isSuccess,
    error,
    isSignLoading,
    setIsSignLoading,
  } = useCreateContractFile({
    contract: contractData,
    signature: canvasRef.current?.toDataURL("image/png") || null,
  });
  const isRTL = useIsRTL();
  useEffect(() => {
    if (isSuccess) {
      setIsSignLoading(false);
      navigate(APP_ROUTES.home);
    }

    if (error) {
      toast(error);
    }
  }, [isSuccess, navigate, error]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const handleCreateContract = () => {
    if (!isSuccess) {
      setIsCreateOn(!isCreateOn);
    }
  };

  return contractData ? (
    <>
      <ContractHeader />
      <div
        className="flex justify-center relative overflow-hidden"
        style={{ backgroundColor: "#F7F8FB" }}
      >
        <div
          className={`absolute top-0 w-1/2 ${isRTL ? "left-0" : "right-0"} z-0`}
        >
          <img
            src={OurAppPattern2}
            alt="App Pattern"
            className="h-auto animate-float"
          />
        </div>
        <div className="container relative w-full md:p-6 p-4 border border-gray-100 rounded-lg flex flex-col gap-2">
          <div
            id="contract"
            className="text-xs leading-6 flex flex-col gap-2 notranslate"
            dir="ltr"
            translate="no"
          >
            <EmployeeSection contract={contractData} />
            <ContractContent />
          </div>
          <div
            id="contract-page-2"
            className="notranslate"
            dir="ltr"
            translate="no"
          >
            <ContractFooter contract={contractData} />
          </div>

          <h6 className="lg:hidden block p-10 text-center text-sm">
            {t("contract.open-in-web")}
          </h6>

          <SignatureBox
            signatureURL={signatureURL}
            onSignatureURLChange={setSignatureURL}
            canvasRef={canvasRef}
            setSignatureValid={setIsSignuterValid}
          />

          {isSignuterValid && (
            <SignContractButton
              type="button"
              onClick={handleCreateContract}
              isLoading={isSignLoading}
            >
              {t("contract.sign-contact")}
            </SignContractButton>
          )}
        </div>
        {/* <div
          className={`absolute bottom-0  transform ${
            isRTL ? "right-0" : "left-0"
          } z-0`}
        >
          <img
            src={OurAppPattern2}
            alt="App Pattern"
            className="w-3/5 h-auto animate-float"
          />
        </div> */}
      </div>
      <GetStarted />
    </>
  ) : (
    <>
      <ContractHeroNotFound />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="max-w-lg w-full bg-white rounded-md p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {t("contract.notFound.title") || "Contract Not Found"}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {t("contract.notFound.description") ||
              "The contract you're looking for doesn't exist or may have been removed. Please check the URL or contact support if you believe this is an error."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => navigate(APP_ROUTES.home)}
              className="flex-1 bg-[#fd671a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {t("contract.notFound.goHome") || "Go to Homepage"}
            </button>

            <button
              onClick={() => navigate(APP_ROUTES.contact)}
              className="flex-1 border-2 border-purple-600 text-[#fd671a] font-semibold py-3 px-6 rounded-lg hover:bg-[#fd671a] hover:text-white transition-all duration-200"
            >
              {t("contract.notFound.contactSupport") || "Contact Support"}
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {t("contract.notFound.helpText") ||
                "Need help? Our support team is available 24/7"}
            </p>
          </div>
        </div>
      </div>
      <GetStarted />
    </>
  );
};

export default ContractPage;
