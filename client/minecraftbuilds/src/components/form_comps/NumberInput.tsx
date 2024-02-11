import { ChangeEvent } from "react";

interface Props {
  label: string;
  feild: string;
  required: boolean;
  max: number;
  min: number;
  onChange: (formFeild: string, value: number) => void;
  error: string | null | undefined;
}

function NumberInput({ label, feild, max, min, required, onChange, error }: Props) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.name, parseInt(e.target.value));
  }

  return (
    <div className="number-input">
      <label htmlFor={feild}>{label}</label> <br />
      <input
        type="number"
        id={feild}
        name={feild}
        onChange={handleInputChange}
        maxLength={max}
        minLength={min}
        required={required}
      ></input>
      <div className="input-error">{error}</div>
    </div>
  );
}

export default NumberInput;
