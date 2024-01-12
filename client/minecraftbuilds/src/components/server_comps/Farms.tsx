interface Props {
  serverName: string;
}

function Farms({ serverName }: Props) {
  return (
    <>
      <h1>{serverName} Farms</h1>
    </>
  );
}

export default Farms;
