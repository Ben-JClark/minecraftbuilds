interface Props {
  serverName: string;
  serverID: number;
}

function Players({ serverName, serverID }: Props) {
  return (
    <>
      <h1>
        Server: {serverName} ID: {serverID} Players
      </h1>
    </>
  );
}

export default Players;
