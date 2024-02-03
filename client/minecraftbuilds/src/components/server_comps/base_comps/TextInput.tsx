import { ChangeEvent } from "react";

interface Props {
  label: string;
  feild: string;
  required: boolean;
  max: number;
  onChange: (formFeild: string, value: string) => void;
  error: string | null;
}

function TextInput({ label, feild, max, required, onChange, error }: Props) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.name, e.target.value);
  }

  return (
    <div className="text-input">
      <label htmlFor={feild}>{label}</label> <br />
      <input
        type="text"
        id={feild}
        name={feild}
        onChange={handleInputChange}
        maxLength={max}
        required={required}
      ></input>
      <div className="input-error">{error}</div>
    </div>
  );
}

export default TextInput;
