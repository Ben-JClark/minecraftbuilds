import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ServerListing from "./ServerListing";
import "../styling/PageStyle.css";
import "../styling/ServerBrowser.css";

type Server = {
  serverName: string;
  serverId: number;
  shortDescription: string | undefined;
  gamemode: string | undefined;
  region: string | undefined;
  configuration: string | undefined;
  listedDate: Date;
  ownerId: number;
  ownerUsername: string;
  userCount: number;
};

function ServerBrowser() {
  const [serverList, setServerList] = useState<Server[]>([]);

  // Only when mounting, fetch and map all the Server data
  useEffect(() => {
    async function getServerList() {
      try {
        const response = await fetch("http://localhost:5000/");
        const data = await response.json();
        if (data.error === undefined && Array.isArray(data)) {
          const serverData: Server[] = data.map((rawServerData: any) => ({
            serverName: rawServerData.server_name,
            serverId: rawServerData.server_id,
            shortDescription: rawServerData.short_description,
            gamemode: rawServerData.gamemode,
            region: rawServerData.region,
            configuration: rawServerData.configuration,
            listedDate: new Date(rawServerData.created_at),
            ownerId: rawServerData.owner_id,
            ownerUsername: rawServerData.username,
            userCount: rawServerData.user_count,
          }));
          setServerList(serverData);
        } else {
          console.log("Error received from the server: ", data.error);
        }
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
          <ul className="sl-container">
            {serverList.map((server: Server) => (
              <li className="sl-item" key={server.serverId}>
                <ServerListing server={server} />
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar" id="sidebar-l"></div>
        <div className="sidebar" id="sidebar-r"></div>
      </div>
    </>
  );
}

export default ServerBrowser;
export type { Server };
