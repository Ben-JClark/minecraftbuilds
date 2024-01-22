interface Props {
  serverName: string;
  serverID: number;
}

function Farms({ serverName, serverID }: Props) {
  return (
    <>
      <h1>
        Server: {serverName} ID: {serverID} Farms
      </h1>
    </>
  );
}

export default Farms;
