import "../styling/PrimNavBar.css";
import { Link } from "react-router-dom";

function PrimNavBar() {
  return (
    <nav className="nav">
      <Link to="/" className="server-title">
        Change server
      </Link>
      <ul>
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
