import React from "react";
import { useEffect } from "react";
import Menu from "./Menu";
import Footer from "./Footer";

const Layout = ({ title = "Title", className, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <header className="site-header">
        <div
          className="site-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className="brand">MyCommerce</div>
          </div>
          <nav className="nav-links">
            <Menu />
          </nav>
        </div>
      </header>

      <main className={`site-container ${className || ""}`}>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
