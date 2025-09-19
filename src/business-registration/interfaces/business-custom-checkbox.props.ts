export interface BusinessOption {
  id: number;
  label: string;
  value: string;
  icon: string;
}

export interface BusinessCustomCheckboxProps {
  options: BusinessOption[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  title?: string;
  error?: string;
}
