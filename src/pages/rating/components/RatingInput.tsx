import { ErrorMessage } from "@components";

interface RatingInputProps {
  id: string;
  value: string;
  placeholder: string;
  error: string | null;
  onValueChange: (value: string) => void;
}

const RatingInput = ({
  id,
  value,
  placeholder,
  error,
  onValueChange,
}: RatingInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        id={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className="p-3 rounded-lg w-full text-xs border wow fadeInUp"
        data-wow-delay="0.2s"
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default RatingInput;
