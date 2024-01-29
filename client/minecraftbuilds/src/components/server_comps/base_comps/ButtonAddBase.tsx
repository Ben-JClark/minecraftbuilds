import { Link } from "react-router-dom";

interface Props {
  serverName: string;
  serverID: number;
}

function ButtonAddBase({ serverName, serverID }: Props) {
  return (
    <>
      <p>Add Base</p>
      <Link to={`/server/${serverName}/${serverID}/bases/add`}>Add Base</Link>
    </>
  );
}

export default ButtonAddBase;
