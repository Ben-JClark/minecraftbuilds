import { ChangeEvent } from "react";

interface Props {
  label: string;
  feild: string;
  name: string;
  value: boolean;
  isChecked: boolean;
  onChange: (formFeild: string, value: boolean) => void;
}

function RadioInput({ label, feild, name, value, isChecked, onChange }: Props) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    let inputValue;
    if (e.target.value === "true") {
      inputValue = true;
    } else {
      inputValue = false;
    }
    onChange(e.target.name, inputValue);
  }

  return (
    <div className="text-area-input">
      <label htmlFor={feild}>{label}</label>
      <input
        type="radio"
        id={feild}
        name={name}
        value={value.toString()}
        checked={isChecked}
        onChange={handleInputChange}
      ></input>
    </div>
  );
}

export default RadioInput;
