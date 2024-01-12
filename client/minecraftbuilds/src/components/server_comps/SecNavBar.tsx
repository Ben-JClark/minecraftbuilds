import { Link } from "react-router-dom";
import "../../styling/SecNavBar.css";

interface Props {
  serverName: string;
}

function SecNavBar({ serverName }: Props) {
  return (
    <nav className="nav">
      <Link to={`/server/${serverName}/home`} className="server-title">
        {serverName}
      </Link>
      <ul>
        <li>
          <Link to={`/server/${serverName}/home`}>Home</Link>
        </li>
        <li>
          <Link to={`/server/${serverName}/bases`}>Bases</Link>
        </li>
        <li>
          <Link to={`/server/${serverName}/shops`}>Shops</Link>
        </li>
        <li>
          <Link to={`/server/${serverName}/farms`}>Farms</Link>
        </li>
        <li>
          <Link to={`/server/${serverName}/players`}>Players</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SecNavBar;
