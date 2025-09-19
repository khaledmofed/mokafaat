export interface PrimaryGradientButtonProps {
  to?: string;
  type?: any;
  className?: string;
  children: React.ReactNode;
  textTransform?: "uppercase" | "capitalize";
  visibility?: "hidden" | "flex";
  onClick?: () => void;
  isLoading?: boolean;
}
