import { Route, Routes } from "react-router-dom";
// Navbars
import PrimNavBar from "./components/PrimNavBar";
// Pages
import ServerBrowser from "./components/ServerBrowser";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ServerPage from "./components/server_comps/ServerPage";
// This styling will style pages for all components
import "./styling/PageStyle.css";
import "./styling/App.css";

function App() {
  return (
    <>
      <PrimNavBar />
      <Routes>
        <Route path="/" element={<ServerBrowser />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Nested routes for server pages */}
        <Route path="/server/:serverName/:serverID/*" element={<ServerPage />} />
      </Routes>
    </>
  );
}

export default App;
