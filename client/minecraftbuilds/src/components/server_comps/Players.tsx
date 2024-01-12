interface Props {
  serverName: string;
}

function Players({ serverName }: Props) {
  return (
    <>
      <h1>{serverName} Players</h1>
    </>
  );
}

export default Players;
