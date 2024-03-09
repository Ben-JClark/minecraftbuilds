import { FormEvent, useState } from "react";
import PasswordInput from "./form_comps/PasswordInput";
import TextInput from "./form_comps/TextInput";
import EmailInput from "./form_comps/EmailInput";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import SuccessMessage from "./ui_components/SuccessMessage";

type ServerError = {
  feild: string | null;
  message: string | null;
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
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

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
        await axios.post(`http://localhost:5000/auth/signup`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSuccess(true);
        setServerError(null);
      } catch (error: unknown) {
        // Check if the server sent back any information on the error
        setSuccess(false);
        if (
          error instanceof AxiosError &&
          error.response &&
          "feild" in error.response.data &&
          "message" in error.response.data
        ) {
          setServerError({ feild: error.response.data.feild, message: error.response.data.message });
        } else {
          setServerError({ feild: null, message: "Something went wrong" });
        }
      }
    } else {
      console.log("Can't submit, confirmed password does not match");
    }
  }

  return (
    <>
      {success === true ? (
        <SuccessMessage
          message="You have successfully signed up, now you can sign in"
          buttonText="Sign in"
          url="/sign-in"
        />
      ) : (
        <>
          <div className="options">
            <h1>Sign Up</h1>
          </div>
          <div className="content">
            {serverError !== null ? (
              <div className="generic-error">
                {serverError.feild} {serverError.message}{" "}
              </div>
            ) : null}
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Enter your username"
                feild="username"
                max={16}
                required={true}
                onChange={handleChange}
                error={serverError?.feild === "username" ? serverError.message : null}
              />
              <EmailInput
                label="Enter your email"
                feild="email"
                max={254}
                required={true}
                onChange={handleChange}
                error={serverError?.feild === "email" ? serverError.message : null}
              />
              <PasswordInput
                label="Enter your password"
                feild="password"
                onChange={handleChange}
                error={serverError?.feild === "password" ? serverError.message : null}
              />
              <PasswordInput
                label="Confirm your password"
                feild="confirm_password"
                onChange={handleChange}
                error={serverError?.feild === "confirm_password" ? serverError.message : null}
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
            {`Already have an account? `}
            <Link to={`/sign-in`}>Sign In</Link>
          </div>
        </>
      )}
    </>
  );
}

export default SignUp;
