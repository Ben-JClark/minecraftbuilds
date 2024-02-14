import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ServerListing from "./ServerListing";
import "../styling/ServerBrowser.css";

import axios from "axios";
// Imports related to parsing the server response
import type { ServerResponse, ServerMessage } from "../ServerUtils";
import { parseServerMessage } from "../ServerUtils";

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
  const [serverMessage, setServerMessage] = useState<ServerMessage | undefined>(undefined);

  useEffect(() => {
    async function getServerList() {
      try {
        const getResponse = await axios.get("http://localhost:5000/");
        const response: ServerResponse = getResponse.data;

        const serverData: Server[] = response.data.map((rawServerData: any) => ({
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
      } catch (error: any) {
        setServerMessage(parseServerMessage(error?.response?.data));
      }
    }

    getServerList();
  }, []);

  return (
    <>
      <div className="grid-main">
        <div className="page">
          <div className="options">options</div>
          <div className="content">
            {/* Display any errors*/}
            {serverMessage?.success === false ? (
              <div className="generic-error"> {serverMessage?.errorMessage} </div>
            ) : null}

            {/* Display all the servers */}
            <ul className="sl-container">
              {serverList.map((server: Server) => (
                <li className="sl-item" key={server.serverId}>
                  <ServerListing server={server} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sidebar" id="sidebar-l"></div>
        <div className="sidebar" id="sidebar-r"></div>
      </div>
    </>
  );
}

export default ServerBrowser;
export type { Server };
