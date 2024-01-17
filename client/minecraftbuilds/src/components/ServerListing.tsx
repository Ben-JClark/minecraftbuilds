import type { Server } from "./ServerBrowser";

interface Props {
  server: Server;
}

function ServerListing({ server }: Props) {
  return (
    <div>
      <h1>{server.serverName}</h1>
      <p>
        Listed by {server.ownerUsername} {timeSince(server.listedDate)} ago
      </p>
      <p>
        {server.gamemode} | {server.configuration} | {server.region}
      </p>
      <p>{server.userCount}</p>
      <p>{server.shortDescription}</p>
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
