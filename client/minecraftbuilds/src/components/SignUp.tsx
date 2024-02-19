import { FormEvent, useState } from "react";
import PasswordInput from "./form_comps/PasswordInput";
import TextInput from "./form_comps/TextInput";
import EmailInput from "./form_comps/EmailInput";
import axios from "axios";

// Imports related to parsing the server response
import type { ServerResponse, ServerMessage } from "../ServerUtils";
import { parseServerMessage } from "../ServerUtils";

type signUpData = {
  username: string;
  email: string;
  password: string;
};

function SignUp() {
  const [formData, setFormData] = useState<signUpData>({
    username: "",
    email: "",
    password: "",
  });
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [serverMessage, setServerMessage] = useState<ServerMessage | undefined>(undefined);

  function handleChange(formFeild: string, value: string) {
    // Check and set the confirm password which is not part of the formData
    if (formFeild === "confirm_password") {
      setConfirmedPassword(() => value);
    } else {
      // Else update formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        [formFeild]: value,
      }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.password === confirmedPassword) {
      try {
        const postResponse = await axios.post(`http://localhost:5000/auth/signup`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response: ServerResponse = postResponse.data;
        setServerMessage(parseServerMessage(response));
      } catch (error: any) {
        setServerMessage(parseServerMessage(error?.response?.data));
      }
    } else {
      console.log("Can't submit, confirmed password does not match");
    }
  }

  return (
    <>
      <div className="options">
        <h1>Sign Up</h1>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Enter your username"
            feild="username"
            max={16}
            required={true}
            onChange={handleChange}
            error={serverMessage?.invalidFeild === "username" ? serverMessage.errorMessage : null}
          />
          <EmailInput
            label="Enter your email"
            feild="email"
            max={254}
            required={true}
            onChange={handleChange}
            error={serverMessage?.invalidFeild === "email" ? serverMessage.errorMessage : null}
          />
          <PasswordInput
            label="Enter your password"
            feild="password"
            onChange={handleChange}
            error={serverMessage?.invalidFeild === "password" ? serverMessage.errorMessage : null}
          />
          <PasswordInput
            label="Confirm your password"
            feild="confirm_password"
            onChange={handleChange}
            error={serverMessage?.invalidFeild === "confirm_password" ? serverMessage.errorMessage : null}
          />

          {/* Display if the passwords match when they input 8 or more characters */}
          {formData.password.length >= 8 && confirmedPassword.length >= 8 ? (
            formData.password === confirmedPassword ? (
              <div>Passwords match</div>
            ) : (
              <div className="input-error">Passwords don't match</div>
            )
          ) : null}

          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
