import SecNavBar from "./SecNavBar";
import Home from "./Home";
import Bases from "./Bases";
import Shops from "./Shops";
import Farms from "./Farms";
import Players from "./Players";
import { Route, Routes, useParams } from "react-router-dom";

function ServerPage() {
  // App.tsx loads this component with the path /server/:serverName/*
  // so obtain the server name from the url
  const { serverName, serverID } = useParams();

  // Display server page if serverID is a valid number and serverName exists
  if (serverID !== undefined) {
    const id: number = parseInt(serverID);
    if (serverName !== undefined && !isNaN(id)) {
      return (
        <>
          <SecNavBar serverName={serverName} serverID={id} />
          <div className="grid-main">
            <div className="page">
              <Routes>
                <Route path="/home" element={<Home serverName={serverName} serverID={id} />} />
                <Route path="/bases" element={<Bases serverName={serverName} serverID={id} />} />
                <Route path="/shops" element={<Shops serverName={serverName} serverID={id} />} />
                <Route path="/farms" element={<Farms serverName={serverName} serverID={id} />} />
                <Route path="/players" element={<Players serverName={serverName} serverID={id} />} />
              </Routes>
            </div>
            <div className="sidebar" id="sidebar-l"></div>
            <div className="sidebar" id="sidebar-r"></div>
          </div>
        </>
      );
    }
  }
  return <h1>Server not found</h1>;
}

export default ServerPage;
