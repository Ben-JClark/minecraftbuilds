import SecNavBar from "./SecNavBar";
import Home from "./Home";
import Bases from "./Bases";
import Shops from "./Shops";
import Farms from "./Farms";
import Players from "./Players";
import { Route, Routes, useParams } from "react-router-dom";

function ServerPage() {
  const { serverName } = useParams();

  return (
    <>
      {serverName ? (
        <>
          <SecNavBar serverName={serverName} />
          <Routes>
            <Route path="/home" element={<Home serverName={serverName} />} />
            <Route path="/bases" element={<Bases serverName={serverName} />} />
            <Route path="/shops" element={<Shops serverName={serverName} />} />
            <Route path="/farms" element={<Farms serverName={serverName} />} />
            <Route path="/players" element={<Players serverName={serverName} />} />
          </Routes>
        </>
      ) : (
        <h1>Server not found</h1>
      )}
    </>
  );
}

export default ServerPage;
