interface Props {
  serverName: string;
}

function Bases({ serverName }: Props) {
  return (
    <>
      <h1>{serverName} Bases</h1>
    </>
  );
}

export default Bases;
