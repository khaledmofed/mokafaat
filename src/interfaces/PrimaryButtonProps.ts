export interface PrimaryButtonProps {
  onClick: () => void;
  type?: any;
  visibility?: "hidden" | "block";
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}
