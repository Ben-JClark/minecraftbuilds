import { Link } from "react-router-dom";
import "../../styling/SecNavBar.css";

interface Props {
  serverName: string;
  serverID: number;
}

function SecNavBar({ serverName, serverID }: Props) {
  return (
    <nav className="sec-nav">
      <Link to={`/server/${serverName}/${serverID}/home`} className="sec-nav-title">
        {serverName}
      </Link>
      <ul>
        <li>
          <Link to={`/server/${serverName}/${serverID}/home`}>Home</Link>
        </li>
        <li>
          <Link to={`/server/${serverName}/${serverID}/bases`}>Bases</Link>
        </li>
        <li>
          <Link to={`/server/${serverName}/${serverID}/shops`}>Shops</Link>
        </li>
        <li>
          <Link to={`/server/${serverName}/${serverID}/farms`}>Farms</Link>
        </li>
        <li>
          <Link to={`/server/${serverName}/${serverID}/players`}>Players</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SecNavBar;
