export interface ExperinceFormInputProps {
  label: string;
  type?: string;
  id: string;
  className?: string;
  placeholder?: string;
  value?: string;
  handleOnChange?: (value: any) => void;
  error: string | null;
}
