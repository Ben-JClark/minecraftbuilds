interface Props {
  serverName: string;
  serverID: number;
}

function AddBase({ serverName, serverID }: Props) {
  return (
    <>
      <div className="options">
        <h1>Add your base to {serverName}</h1>
      </div>
      <div className="content"></div>
    </>
  );
}

export default AddBase;
