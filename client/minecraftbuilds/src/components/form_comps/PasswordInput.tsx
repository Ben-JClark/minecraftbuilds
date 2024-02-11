import { ChangeEvent } from "react";

interface Props {
  label: string;
  feild: string;
  onChange: (formFeild: string, value: string) => void;
  invalidMessage: string | null | undefined;
  validMessage: string | null | undefined;
}

function TextInput({ label, feild, onChange, invalidMessage, validMessage }: Props) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.name, e.target.value);
  }

  return (
    <div className="text-input">
      <label htmlFor={feild}>{label}</label> <br />
      <input
        type="password"
        id={feild}
        name={feild}
        onChange={handleInputChange}
        maxLength={256}
        minLength={8}
        required={true}
      ></input>
      <div className="input-error">{invalidMessage}</div>
      <div className="input-success">{validMessage}</div>
    </div>
  );
}

export default TextInput;
