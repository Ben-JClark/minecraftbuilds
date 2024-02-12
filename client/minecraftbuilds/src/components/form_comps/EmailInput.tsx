import { ChangeEvent } from "react";

interface Props {
  label: string;
  feild: string;
  required: boolean;
  max: number;
  onChange: (formFeild: string, value: string) => void;
  error: string | null | undefined;
}

function EmailInput({ label, feild, max, required, onChange, error }: Props) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.name, e.target.value);
  }

  return (
    <div className="email-input">
      <label htmlFor={feild}>{label}</label> <br />
      <input
        type="email"
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

export default EmailInput;
