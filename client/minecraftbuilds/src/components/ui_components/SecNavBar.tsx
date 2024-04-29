import { Link } from "react-router-dom";
import "../../styling/SecNavBar.css";
import { useState } from "react";

interface Props {
  serverName: string;
  serverID: number;
  screenWidth: number;
}

function SecNavBar({ serverName, serverID, screenWidth }: Props) {
  const [showList, setShowList] = useState<boolean>(false);

  function toggleList() {
    setShowList((prev) => !prev);
  }

  return (
    <nav className="sec-nav">
      {
        /* Show a button to display the drop down list */
        <div className="sec-nav-title">
          <div>{serverName}</div>
          {screenWidth < 780 ? (
            <button className="sec-nav-hambuger-btn" onClick={() => toggleList()}>
              <img className="sec-nav-hambuger" src={process.env.PUBLIC_URL + "/hamburger.png"} alt="Hamburger Menu" />
            </button>
          ) : null}
        </div>
      }
      {
        /* Show navbar if screen >= 780px or dropdown list is selected*/
        screenWidth >= 780 || showList ? (
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
        ) : null
      }
    </nav>
  );
}

export default SecNavBar;
