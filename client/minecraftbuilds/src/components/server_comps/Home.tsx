import { useEffect, useState } from "react";

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
        const description = data.description[0].long_description;
        if (data.error === undefined && description !== undefined) {
          setLongDescription(description);
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
    <>
      <h1>
        Name: {serverName} ID: {serverID}
      </h1>
      <p> {longDescription}</p>
    </>
  );
}

export default Home;
