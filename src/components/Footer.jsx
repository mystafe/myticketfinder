import React from "react";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="row u-center-text u-margin-bottom-big">
        <Link
          href="https://www.linkedin.com/in/mustafa-e-728bb1a5/"
          className="footer__link"
        >
          Mustafa Evleksiz
        </Link>
      </div>
      <div className="row">
        <div className="col-1-of-3">
          <div>Aloha Final Project</div>
        </div>
        <div className="col-1-of-3">
          <div>
            <p> My Ticket Finder App</p>
          </div>
        </div>
        <div className="col-1-of-3">
          <div>
            <p> All Rights reserved &copy; - 2023</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
