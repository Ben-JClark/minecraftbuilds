import { FormEvent, useState } from "react";
import PasswordInput from "./form_comps/PasswordInput";
import TextInput from "./form_comps/TextInput";
import EmailInput from "./form_comps/EmailInput";
import axios from "axios";

type FormMessage = {
  validRequest?: boolean;
  statusCode?: number;
  invalidFeild?: string;
  validFeild?: string;
  message?: string;
};

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
  const [formMessage, setFormMessage] = useState<FormMessage | null>(null);

  console.log("formData", formData, `confirmedPassword: ${confirmedPassword}`);

  function handleChange(formFeild: string, value: string) {
    console.log(`handleChange for: ${formFeild} with value ${value}`);
    // Check and set the confirm password which is not part of the formData
    if (formFeild === "confirm_password") {
      console.log(`Set ${formFeild} to: ${value}`);
      setConfirmedPassword(() => value);
    } else {
      // Else update formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        [formFeild]: value,
      }));
    }

    // If one password has been updated check if they match
    if (formFeild === "password") {
      passwordsMatch(value, confirmedPassword);
    } else if (formFeild === "confirm_password") {
      passwordsMatch(formData.password, value);
    }
  }

  function passwordsMatch(password: string, cPassword: string): boolean {
    if (password === cPassword) {
      setFormMessage({ invalidFeild: undefined, validFeild: "confirm_password", message: "Passwords match" });
      return true;
    } else {
      setFormMessage({ validFeild: undefined, invalidFeild: "confirm_password", message: "Passwords don't match" });
      return false;
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (passwordsMatch(formData.password, confirmedPassword)) {
      let serverResponse: FormMessage;
      try {
        serverResponse = await axios.post(`http://localhost:5000/signup`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response from server: ", serverResponse);
      } catch (error: any) {
        // If we got a formMessage from the server
        if (error.formMessage) {
          console.log("Error formMessage from the server", error.formMessage);
        } else {
          // Else there was some other error
          console.log("General Error signing up: ", error.message);
        }
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
            error={formMessage?.invalidFeild === "username" ? formMessage.message : null}
          />
          <EmailInput
            label="Enter your email"
            feild="email"
            max={254}
            required={true}
            onChange={handleChange}
            error={formMessage?.invalidFeild === "email" ? formMessage.message : null}
          />
          <PasswordInput
            label="Enter your password"
            feild="password"
            onChange={handleChange}
            validMessage={formMessage?.invalidFeild === "password" ? formMessage.message : null}
            invalidMessage={formMessage?.validFeild === "password" ? formMessage.message : null}
          />
          <PasswordInput
            label="Confirm your password"
            feild="confirm_password"
            onChange={handleChange}
            validMessage={formMessage?.invalidFeild === "confirm_password" ? formMessage.message : null}
            invalidMessage={formMessage?.validFeild === "confirm_password" ? formMessage.message : null}
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
