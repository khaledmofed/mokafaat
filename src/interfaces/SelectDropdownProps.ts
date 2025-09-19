export interface SelectDropdownProps {
  id: string;
  placeholder: string;
  optionLabel: string;
  items: any[];
  selectedItem: any | null;
  onSelectItemChange: (selectedItem: any | null) => void;
  error? : string | null
}
