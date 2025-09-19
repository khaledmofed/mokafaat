export interface VenuInformationsProps {
  gatesNumber: string;
  onGatesNumberChangeChange: (number: string) => void;
  onVenueMapChange: (file: File | null) => void;
  gatesData: Record<string, any>[];
  onGateDataChange: (index: number, newGateData: any) => void;
}
