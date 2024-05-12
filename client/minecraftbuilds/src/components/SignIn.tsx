import { FormEvent, useState } from "react";
import PasswordInput from "./form_comps/PasswordInput";
import EmailInput from "./form_comps/EmailInput";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import MessageBox from "./ui_components/MessageBox";

type ServerError = {
  feild: string | null;
  message: string | null;
};

type SignInData = {
  email: string;
  password: string;
};

interface Props {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function SignIn({ setIsAuthenticated }: Props) {
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  function handleChange(formFeild: string, value: string) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formFeild]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/signin", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccess(true);
      setServerError(null);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      // Check if the server sent back any information on the error
      setSuccess(false);
      if (error instanceof AxiosError && error.response) {
        // If its a 403, the user is already signed in, therefor cannot sign in again
        if (error.response.status === 403) {
          setServerError({ feild: null, message: "You are already signed in, you must sign out to sign in again" });
        } else if ("feild" in error.response.data && "message" in error.response.data) {
          setServerError({ feild: error.response.data.feild, message: error.response.data.message });
        } else {
          setServerError({ feild: null, message: "Something went wrong" });
        }
      } else {
        setServerError({ feild: null, message: "Something went wrong" });
      }
      console.error(error);
    }
  }

  return (
    <div className="grid-main">
      <div className="page">
        {success === true ? (
          <MessageBox message="You have successfully signed in" buttonText="Browse Servers" url="/" />
        ) : (
          <>
            <div className="options">
              <h1>Sign In</h1>
            </div>
            <div className="content">
              {serverError !== null ? (
                <div className="generic-error">
                  {serverError.feild} {serverError.message}{" "}
                </div>
              ) : null}
              <form onSubmit={handleSubmit}>
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

                <button type="submit">Sign in</button>
              </form>
              {`Don't have an account? `}
              <Link to={`/sign-up`}>Sign Up</Link>
            </div>
          </>
        )}
      </div>
      <div className="sidebar" id="sidebar-l"></div>
      <div className="sidebar" id="sidebar-r"></div>
    </div>
  );
}

export default SignIn;
