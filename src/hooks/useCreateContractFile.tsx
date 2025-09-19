import { ContractModel } from "@entities";
import { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import useGetContractTemplate from "./useGetContractTemplate";
import useGetContractFont from "./useGetContractFont";
import moment from "moment";
import { getName } from "country-list";
import useSignContract from "./useSignContract";

interface UseCreateContractFileProps {
  contract: ContractModel | null;
  signature: string | null;
}

const useCreateContractFile = ({
  contract,
  signature,
}: UseCreateContractFileProps) => {
  const [isSignLoading, setIsSignLoading] = useState(false);
  const [isCreateOn, setIsCreateOn] = useState(false);
  const { template } = useGetContractTemplate();
  const { templateFont } = useGetContractFont();
  const [contractFile, setContractFile] = useState<File | null>(null);

  const { isSuccess, error } = useSignContract({
    contractFile,
    contractId: contract?.contractNumber,
  });

  const handleCreate = async () => {
    try {
      if (template && templateFont && signature) {
        setIsSignLoading(!isSignLoading);
        const today = moment().format("YYYY-MM-DD");
        const pdfDoc = await PDFDocument.load(template);
        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(templateFont);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const secondPage = pages[1];

        firstPage.drawText(`${contract?.user.fullName}`, {
          x: 65,
          y: 653,
          size: 8,
          font: customFont,
        });
        firstPage.drawText(`${getName(contract?.user.nationality || "")}`, {
          x: 80,
          y: 633,
          size: 8,
          font: customFont,
        });
        firstPage.drawText(`${contract?.user.city.enName}`, {
          x: 60,
          y: 613,
          size: 8,
          font: customFont,
        });
        firstPage.drawText(`${contract?.user.mobileNumber}`, {
          x: 90,
          y: 593,
          size: 8,
          font: customFont,
        });

        firstPage.drawText(`${contract?.user.fullName}`, {
          x: 425,
          y: 653,
          size: 8,
          font: customFont,
        });
        firstPage.drawText(`${getName(contract?.user.nationality || "")}`, {
          x: 460,
          y: 633,
          size: 8,
          font: customFont,
        });
        firstPage.drawText(`${contract?.user.city.arName}`, {
          x: 510,
          y: 613,
          size: 8,
          font: customFont,
        });
        firstPage.drawText(`${contract?.user.mobileNumber}`, {
          x: 470,
          y: 593,
          size: 8,
          font: customFont,
        });

        firstPage.drawText(`${today}`, {
          x: 465,
          y: 737,
          size: 7,
          font: customFont,
        });
        firstPage.drawText(`${today}`, {
          x: 95,
          y: 737,
          size: 7,
          font: customFont,
        });
        firstPage.drawText(`${today}`, {
          x: 463,
          y: 530,
          size: 7,
          font: customFont,
        });
        firstPage.drawText(`${today}`, {
          x: 215,
          y: 530,
          size: 7,
          font: customFont,
        });

        const signatureImage = await pdfDoc.embedPng(signature);

        secondPage.drawText(`${contract?.user.fullName}`, {
          x: 40,
          y: 735,
          size: 10,
          font: customFont,
        });
        secondPage.drawText(`${contract?.user.fullName}`, {
          x: 425,
          y: 735,
          size: 10,
          font: customFont,
        });
        secondPage.drawImage(signatureImage, {
          x: 50,
          y: 630,
          width: 150,
          height: 50,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        setContractFile(blobToFile(blob, "contract"));
        const blobSize = blob.size;

        // If the size is greater than 10MB, show a warning
        if (blobSize > 10 * 1024 * 1024) {
          alert("The file size exceeds 10MB. Please reduce the content.");
          return;
        }

        // const link = document.createElement("a");
        // link.href = URL.createObjectURL(blob);
        // link.download = "signed_contract.pdf";
        // link.click();
      }
    } catch (error) {
      alert("An error occurred while generating the PDF. Please try again.");
    }
  };

  const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type });
  };

  useEffect(() => {
    if (isCreateOn && contract) {
      if (!signature) {
        alert("Please provide a signature before saving.");
        return;
      }
      handleCreate();
    }
  }, [contract, isCreateOn]);

  return {
    isCreateOn,
    setIsCreateOn,
    isSuccess,
    error,
    isSignLoading,
    setIsSignLoading,
  };
};

export default useCreateContractFile;
