const ErrorMessage = (props: { message?: string }) => {
  return (
    props.message && (
      <p className="text-danger text-sm capitalize text-start">
        {props.message}
      </p>
    )
  );
};

export default ErrorMessage;
