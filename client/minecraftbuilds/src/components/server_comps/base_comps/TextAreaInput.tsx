import { ChangeEvent } from "react";
import "../../../styling/TextAreaInput.css";

interface Props {
  label: string;
  feild: string;
  required: boolean;
  max: number;
  onChange: (formFeild: string, value: string) => void;
  error: string | null;
}

function TextAreaInput({ label, feild, max, required, onChange, error }: Props) {
  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.name, e.target.value);
  }

  return (
    <div className="text-area-input">
      <label htmlFor={feild}>{label}</label> <br />
      <textarea id={feild} name={feild} onChange={handleInputChange} maxLength={max} required={required}></textarea>
      <div className="input-error">{error}</div>
    </div>
  );
}

export default TextAreaInput;
