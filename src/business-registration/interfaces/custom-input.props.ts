export interface BusinessRegistrationCustomInputProps {
  value: string;
  placeholder: string;
  type?: string;
  className?: string;
  error?: string;
  onValueChange: (value: string) => void;
}
