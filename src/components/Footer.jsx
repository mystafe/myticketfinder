import React from "react";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo-box">
        <picture className="footer__logo">
          <source
            srcSet="img/logo-green-small-1x.png 1x, img/logo-green-small-2x.png 2x"
            media="(max-width: 37.5em)"
          />
          <img
            srcSet="img/logo-green-1x.png 1x, img/logo-green-2x.png 2x"
            alt="Full logo"
            src="img/logo-green-2x.png"
          />
        </picture>
      </div>
      <div className="row">
        <p className="footer__copyright">
          <Link
            href="https://www.linkedin.com/in/mustafa-e-728bb1a5/"
            className="footer__link"
          >
            Mustafa Evleksiz
          </Link>
          <p>
            Aloha Final Project
            <p>My Ticket Finder App - 2023</p>
          </p>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
