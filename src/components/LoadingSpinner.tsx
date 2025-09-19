import { ProgressSpinner } from "primereact/progressspinner";

export const LoadingSpinner = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <ProgressSpinner
        style={{ width: "20px", height: "20px" }}
        strokeWidth="2"
        animationDuration=".5s"
        aria-label="Loading"
      />
    </div>
  );
};
