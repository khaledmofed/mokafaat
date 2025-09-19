export interface UniformSpecificationProps {
  uniformQty: number | null;
  onUniformDesignChange: (value: File | null) => void;
  onUniformQtyChange: (value: number) => void;
}
