import { FormEvent, useState } from "react";
import PasswordInput from "./form_comps/PasswordInput";
import EmailInput from "./form_comps/EmailInput";
import axios from "axios";
import { Link } from "react-router-dom";

// Imports related to parsing the server response
import type { ServerResponse, ServerMessage } from "../ServerUtils";
import { parseServerMessage } from "../ServerUtils";

type SignInData = {
  email: string;
  password: string;
};

function SignIn() {
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });

  const [serverMessage, setServerMessage] = useState<ServerMessage | undefined>(undefined);

  function handleChange(formFeild: string, value: string) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formFeild]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const postResponse = await axios.post("http://localhost:5000/auth/signin", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      //const response: ServerResponse = postResponse.data;
      //setServerMessage(parseServerMessage(response));
    } catch (error: any) {
      setServerMessage(parseServerMessage(error?.response?.data));
    }
  }

  return (
    <>
      <div className="options">
        <h1>Sign In</h1>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Sign in</button>
        </form>
        {`Don't have an account? `}
        <Link to={`/sign-up`}>Sign Up</Link>
      </div>
    </>
  );
}

export default SignIn;
