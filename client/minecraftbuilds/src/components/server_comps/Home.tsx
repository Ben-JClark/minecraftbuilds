import { useEffect, useState } from "react";
import "../../styling/Home.css";

interface Props {
  serverName: string;
  serverID: number;
}

function Home({ serverName, serverID }: Props) {
  // Fetch the data of the server
  const [longDescription, setLongDescription] = useState<string>();

  useEffect(() => {
    async function getLongDescription() {
      try {
        const response = await fetch(`http://localhost:5000/server/${serverName}/${serverID}/home`);
        const data = await response.json();
        if (data.error === undefined) {
          if (Array.isArray(data) && data[0].long_description !== undefined) {
            setLongDescription(data[0].long_description);
          } else {
            console.log("Error long description is in incorrect format");
          }
        } else {
          console.log("Error when fetching long descripton: ", data.error);
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
