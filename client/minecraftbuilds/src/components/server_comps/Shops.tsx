interface Props {
  serverName: string;
}

function Shops({ serverName }: Props) {
  return (
    <>
      <h1>{serverName} Shops</h1>
    </>
  );
}

export default Shops;
