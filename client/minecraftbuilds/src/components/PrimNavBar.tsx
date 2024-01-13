import "../styling/PrimNavBar.css";
import { Link } from "react-router-dom";

function PrimNavBar() {
  return (
    <nav className="prim-nav">
      <Link to="/" className="prim-nav-title">
        Browse Servers
      </Link>
      <ul>
        <li>
          <Link to="/privacy">Privacy</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign in</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default PrimNavBar;
