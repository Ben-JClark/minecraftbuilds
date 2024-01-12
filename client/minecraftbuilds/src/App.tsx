import { Route, Routes } from "react-router-dom";
// Navbars
import PrimNavBar from "./components/PrimNavBar";
// Pages
import ChangeServer from "./components/ChangeServer";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ServerPage from "./components/server_comps/ServerPage";

function App() {
  return (
    <>
      <PrimNavBar />
      <Routes>
        <Route path="/" element={<ChangeServer />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Nested routes for server pages */}
        <Route path="/server/:serverName/*" element={<ServerPage />} />
      </Routes>
    </>
  );
}

export default App;
