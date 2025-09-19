export interface FormFileInputProps {
  label: string;
  onFileChange: (file: File | null) => void;
  error?: string | null;
  id?: string;
}
