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
          <SecNavBar serverName={serverName} />
          <Routes>
            <Route path="/home" element={<Home serverName={serverName} serverID={id} />} />
            <Route path="/bases" element={<Bases serverName={serverName} />} />
            <Route path="/shops" element={<Shops serverName={serverName} />} />
            <Route path="/farms" element={<Farms serverName={serverName} />} />
            <Route path="/players" element={<Players serverName={serverName} />} />
          </Routes>
        </>
      );
    }
  }
  return <h1>Server not found</h1>;
}

export default ServerPage;
