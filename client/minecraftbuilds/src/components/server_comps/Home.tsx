import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "../../styling/Home.css";

interface Props {
  serverName: string;
  serverID: number;
}

type ServerError = {
  feild: string | null;
  message: string | null;
};

function Home({ serverName, serverID }: Props) {
  // Long description to be displayed
  const [longDescription, setLongDescription] = useState<string | undefined>(undefined);
  // The data received from a server response, used for error handling
  const [serverError, setServerError] = useState<ServerError | null>(null);

  useEffect(() => {
    async function getLongDescription() {
      try {
        const getResponse = await axios.get(`http://localhost:5000/servers/${serverID}/home`);
        setLongDescription(getResponse.data.long_description);
        setServerError(null);
      } catch (error: any) {
        // Check if the server sent back any information on the error
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
        console.error(error);
      }
    }

    getLongDescription();
  }, []);

  return (
    <div className="home">
      <div className="options">
        <h1>{serverName}</h1>
      </div>
      <div className="content">
        {/* Display any errors*/}
        {serverError !== null ? (
          <div className="generic-error">
            {serverError.feild} {serverError.message}{" "}
          </div>
        ) : null}

        <p> {longDescription}</p>
      </div>
    </div>
  );
}

export default Home;
