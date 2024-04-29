import "../../styling/PrimNavBar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  screenWidth: number; // Width in pixels
}

function PrimNavBar({ isAuthenticated, screenWidth }: Props) {
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
            {
              /* Only show sign up if screen >= 780px */
              screenWidth >= 780 ? (
                <li>
                  <Link to="/sign-up">Sign up</Link>
                </li>
              ) : null
            }
          </>
        )}
      </ul>
    </nav>
  );
}

export default PrimNavBar;
