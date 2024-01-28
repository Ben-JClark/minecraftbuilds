import type { Server } from "./ServerBrowser";
import { Link, useNavigate } from "react-router-dom";
import "../styling/ServerListing.css";

interface Props {
  server: Server;
}

function ServerListing({ server }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(`redirecting to /server/${server.serverName}/${server.serverId}/home`);
    navigate(`/server/${server.serverName}/${server.serverId}/home`);
  };

  return (
    <div onClick={handleClick} className="sl-button">
      <h1 className="sl-header">{server.serverName}</h1>
      <p className="sl-tag">
        Listed by {server.ownerUsername} {timeSince(server.listedDate)} ago
      </p>
      <p className="sl-tag">
        {server.gamemode} | {server.configuration} | {server.region} region
      </p>
      <p className="sl-tag">
        {server.userCount} {server.userCount === 1 ? "Member" : "Members"}
      </p>
      <p className="sl-desc">{server.shortDescription}</p>
    </div>
  );
}

function timeSince(postDate: Date): string {
  const now = new Date();
  const timeDifference = now.getTime() - postDate.getTime();
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  if (hoursDifference < 24) {
    return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"}`;
  } else {
    const daysDifference = Math.floor(hoursDifference / 24);
    return `${daysDifference} ${daysDifference === 1 ? "day" : "days"}`;
  }
}

export default ServerListing;
export { timeSince };
