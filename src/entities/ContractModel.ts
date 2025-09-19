export interface ContractModel {
  id: number;
  contractNumber: string;
  isContractSigned: boolean;
  createdAt: string;
  user: {
    id: number;
    email: string;
    fullName: string;
    mobileNumber: string;
    nationality: string;
    idNumber?: string;
    city: {
      arName: string;
      enName: string;
    };
    department: {
      arTitle: string;
      enTitle: string;
    };
    createdAt: string;
  };
}
