interface Props {
  serverName: string;
  serverID: number;
}

function Bases({ serverName, serverID }: Props) {
  return (
    <>
      <h1>
        Server: {serverName} ID: {serverID} Bases
      </h1>
    </>
  );
}

export default Bases;
