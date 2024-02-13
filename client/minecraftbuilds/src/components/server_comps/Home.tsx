import { useEffect, useState } from "react";
import "../../styling/Home.css";

interface Props {
  serverName: string;
  serverID: number;
}

type ServerResponse = {
  success: boolean;
  statusCode: number;
  data?: any;
  invalidFeild?: string;
  errorMessage?: string;
};

function Home({ serverName, serverID }: Props) {
  // Fetch the data of the server
  const [longDescription, setLongDescription] = useState<string>();

  useEffect(() => {
    async function getLongDescription() {
      try {
        const response = await fetch(`http://localhost:5000/server/${serverID}/home`);
        const serverResponse = (await response.json()) as ServerResponse;
        if (serverResponse.statusCode === 200) {
          setLongDescription(serverResponse.data.long_description);
        } else {
          console.log("Error when fetching long descripton: ", serverResponse.errorMessage);
        }
      } catch (error) {
        console.log("Error when fetching long descripton: ", error);
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
        <p> {longDescription}</p>
      </div>
    </div>
  );
}

export default Home;
