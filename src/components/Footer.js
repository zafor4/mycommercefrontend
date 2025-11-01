import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div
        className="site-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <strong className="brand">MyCommerce</strong>
          <div className="text-muted" style={{ fontSize: 12 }}>
            © {new Date().getFullYear()} MyCommerce. All rights reserved.
          </div>
        </div>
        <div className="text-muted" style={{ fontSize: 13 }}>
          Built with care • Fast, modern shopping experience
        </div>
      </div>
    </footer>
  );
};

export default Footer;
