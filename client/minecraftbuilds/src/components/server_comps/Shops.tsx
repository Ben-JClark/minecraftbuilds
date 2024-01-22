interface Props {
  serverName: string;
  serverID: number;
}

function Shops({ serverName, serverID }: Props) {
  return (
    <>
      <h1>
        Server: {serverName} ID: {serverID} Shops
      </h1>
    </>
  );
}

export default Shops;
