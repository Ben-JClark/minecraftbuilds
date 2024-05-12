import { useState } from "react";
import axios, { AxiosError } from "axios";
import MessageBox from "./ui_components/MessageBox";

type ServerError = {
  feild: string | null;
  message: string | null;
};

interface Props {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function SignOut({ setIsAuthenticated }: Props) {
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  async function handleSignOut() {
    try {
      await axios.delete("http://localhost:5000/auth/signout", {
        withCredentials: true,
      });
      setServerError(null);
      setSuccess(true);
      setIsAuthenticated(false);
    } catch (error) {
      setSuccess(false);
      if (error instanceof AxiosError && error.response) {
        // If its a 401, the user hasn't signed in, therefor cannot sign out
        if (error.response.status === 401) {
          setServerError({ feild: null, message: "You are not signed in, therefore you can't sign out" });
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
    <>
      <div className="grid-main">
        <div className="page">
          {success === true ? (
            <MessageBox message="You have successfully signed out" buttonText="Back to server browser" url="/" />
          ) : (
            <>
              {serverError !== null ? (
                <div className="generic-error">
                  {serverError.feild} {serverError.message}{" "}
                </div>
              ) : null}
              <p>Are you sure you want to sign out?</p>
              <button onClick={handleSignOut}>Sign Out</button>
            </>
          )}
        </div>
        <div className="sidebar" id="sidebar-l"></div>
        <div className="sidebar" id="sidebar-r"></div>
      </div>
    </>
  );
}

export default SignOut;
