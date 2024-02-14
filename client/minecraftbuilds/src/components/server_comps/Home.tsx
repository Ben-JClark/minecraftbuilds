import { useEffect, useState } from "react";
import axios from "axios";
import type { ServerResponse, ServerMessage } from "../../ServerUtils";
import { parseServerMessage } from "../../ServerUtils";
import "../../styling/Home.css";

interface Props {
  serverName: string;
  serverID: number;
}

function Home({ serverName, serverID }: Props) {
  // Long description to be displayed
  const [longDescription, setLongDescription] = useState<string | undefined>(undefined);
  // The data received from a server response, used for error handling
  const [serverMessage, setServerMessage] = useState<ServerMessage | undefined>(undefined);

  useEffect(() => {
    async function getLongDescription() {
      try {
        const getResponse = await axios.get(`http://localhost:5000/server/${serverID}/home`);
        const response: ServerResponse = getResponse.data;
        setServerMessage(parseServerMessage(response));
        setLongDescription(response.data.long_description);
      } catch (error: any) {
        setServerMessage(parseServerMessage(error?.response?.data));
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
        {serverMessage?.success === false ? <div className="generic-error"> {serverMessage?.errorMessage} </div> : null}

        <p> {longDescription}</p>
      </div>
    </div>
  );
}

export default Home;
