import { useState, ChangeEvent } from "react";

export const useInputValue = (props: { initialValue: string }) => {
  const [inputValue, setInputValue] = useState(props.initialValue);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  return {
    inputValue: inputValue,
    onChange: handleInputChange,
  };
};
