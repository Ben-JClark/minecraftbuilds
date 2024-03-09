import { useEffect, useState } from "react";
import ServerListing from "./ServerListing";
import "../styling/ServerBrowser.css";
import axios, { AxiosError } from "axios";

type ServerError = {
  feild: string | null;
  message: string | null;
};

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
  const [serverError, setServerError] = useState<ServerError | null>(null);

  useEffect(() => {
    async function getServerList() {
      try {
        const getResponse = await axios.get("http://localhost:5000/servers/");

        const serverData: Server[] = getResponse.data.map((rawServerData: any) => ({
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
        setServerError(null);
      } catch (error: unknown) {
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
            {serverError !== null ? <div className="generic-error"> {serverError.message} </div> : null}

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
