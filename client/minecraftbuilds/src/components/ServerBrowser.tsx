import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { error } from "console";
import "../styling/PageStyle.css";

type Server = {
  serverName: string;
  serverId: number;
  serverDescr: string;
  listedDate: Date;
  ownerId: number;
  ownerUsername: string;
};

function ServerBrowser() {
  const [serverList, setServerList] = useState<Server[]>([]);

  // Only when mounting, fetch and map all the Server data
  useEffect(() => {
    async function getServerList() {
      try {
        const response = await fetch("http://localhost:5000/");
        const data = await response.json();

        if (data.error === undefined) {
          const serverData: Server[] = data.serverList.map((rawServerData: any) => ({
            serverName: rawServerData.server_name,
            serverId: rawServerData.server_id,
            serverDescr: rawServerData.server_description,
            listedDate: new Date(rawServerData.created_at),
            ownerId: rawServerData.owner_id,
            ownerUsername: rawServerData.owner_username,
          }));
          console.log(serverData);
        } else {
          console.log("Error received from the server: ", data.error);
        }
        console.log();
      } catch (error) {
        console.log("Error fetching the list of servers: ", error);
      }
    }

    getServerList();
  }, []);

  return (
    <>
      <div className="grid-main">
        <div className="page">
          <div className="options">options</div>
          <div className="content">content</div>
        </div>
        <div className="sidebar" id="sidebar-l"></div>
        <div className="sidebar" id="sidebar-r"></div>
      </div>
      {/* <Link to="/server/Hubcraft/home">HubCraft</Link> */}
    </>
  );
}

export default ServerBrowser;
