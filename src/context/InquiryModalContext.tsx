import React, { createContext, useContext, useState, ReactNode } from "react";

interface InquiryModalContextType {
  isOpen: boolean;
  openModal: (title?: string, subtitle?: string) => void;
  closeModal: () => void;
  modalTitle: string;
  modalSubtitle: string;
}

const InquiryModalContext = createContext<InquiryModalContextType | undefined>(
  undefined
);

export const useInquiryModal = () => {
  const context = useContext(InquiryModalContext);
  if (context === undefined) {
    throw new Error(
      "useInquiryModal must be used within an InquiryModalProvider"
    );
  }
  console.log("useInquiryModal hook called, context:", context);
  return context;
};

interface InquiryModalProviderProps {
  children: ReactNode;
}

export const InquiryModalProvider: React.FC<InquiryModalProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Inquiry Form");
  const [modalSubtitle, setModalSubtitle] = useState(
    "Add all details and inquire this services."
  );

  const openModal = (title?: string, subtitle?: string) => {
    console.log("openModal called with:", { title, subtitle });
    if (title) setModalTitle(title);
    if (subtitle) setModalSubtitle(subtitle);
    setIsOpen(true);
    console.log("Modal state updated, isOpen should be true");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const value: InquiryModalContextType = {
    isOpen,
    openModal,
    closeModal,
    modalTitle,
    modalSubtitle,
  };

  return (
    <InquiryModalContext.Provider value={value}>
      {children}
    </InquiryModalContext.Provider>
  );
};
