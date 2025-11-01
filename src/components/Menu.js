import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut, isAuthenticated, userInfo } from "../utils/auth";
import { useState, useEffect } from "react";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dashboardPath, setDashboardPath] = useState("/user/dashboard");

  useEffect(() => {
    if (isAuthenticated()) {
      const { role } = userInfo();
      setDashboardPath(`/${role}/dashboard`);
    }
  }, []);

  const LinkItem = ({ to, children }) => (
    <Link
      className={`nav-link ${location.pathname === to ? "active" : ""}`}
      to={to}
    >
      {children}
    </Link>
  );

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <LinkItem to={"/"}>Home</LinkItem>
      {!isAuthenticated() && (
        <>
          <LinkItem to={"/login"}>Login</LinkItem>
          <LinkItem to={"/register"}>Register</LinkItem>
        </>
      )}

      {isAuthenticated() && (
        <>
          <LinkItem to={dashboardPath}>Dashboard</LinkItem>
          <LinkItem to={"/cart"}>Cart</LinkItem>
          <span
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => signOut(() => navigate("/login", { replace: true }))}
          >
            Log Out
          </span>
        </>
      )}
    </div>
  );
};

export default Menu;
