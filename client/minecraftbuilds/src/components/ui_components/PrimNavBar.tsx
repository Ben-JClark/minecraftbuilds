import "../../styling/PrimNavBar.css";
import { Link } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  /* setIsAuthenticated: (isAuthenticated: boolean) => void; */
}

function PrimNavBar({ isAuthenticated }: Props) {
  return (
    <nav className="prim-nav">
      <Link to="/" className="prim-nav-title">
        Servers
      </Link>
      <ul>
        <li>
          <Link to="/legal">Legal</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link to="/sign-out">Sign out</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/sign-in">Sign in</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default PrimNavBar;
