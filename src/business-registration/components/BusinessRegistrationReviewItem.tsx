export const BusinessRegistrationReviewItem = (props: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col gap-2 text-xs">
      <label htmlFor={props.label} className=" text-gray-500">
        {props.label}
      </label>
      <span className="text-gray-400">{props.value}</span>
    </div>
  );
};
