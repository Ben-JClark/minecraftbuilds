import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PrimNavBar from "./components/ui_components/PrimNavBar";
import ServerBrowser from "./components/ServerList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ServerPage from "./components/server_comps/ServerPage";
import SignOut from "./components/SignOut";
import axios from "axios";
import "./styling/PageStyle.css";
import "./styling/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if the user is authenticated to begin with
  useEffect(() => {
    async function getBaseList() {
      try {
        const getResponse = await axios.get("http://localhost:5000/auth/check", {
          withCredentials: true,
        });
        setIsAuthenticated(getResponse.data.authenticated);
      } catch (error: unknown) {
        console.log("Failed to check user authentication");
      }
    }
    getBaseList();
  }, []);

  return (
    <>
      <PrimNavBar isAuthenticated={isAuthenticated} /* setIsAuthenticated={setIsAuthenticated} */ />
      <Routes>
        <Route path="/" element={<ServerBrowser />} />
        <Route path="/sign-in" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-out" element={<SignOut setIsAuthenticated={setIsAuthenticated} />} />

        {/* Nested routes for server pages */}
        <Route path="/server/:serverName/:serverID/*" element={<ServerPage isAuthenticated={isAuthenticated} />} />
      </Routes>
    </>
  );
}

export default App;
