import React from "react";

function Footer() {
  return (
    <div className="footer">
      {/* ticket company */}

      <div className="footer__left">
        <h1>Events</h1>
        <p>Places</p>
        <p>Careers</p>
        <p>Terms of Use</p>
        <p>Privacy</p>
        <p>Cookie Policy</p>
      </div>

      <div className="footer__right">
        <h1>Organizers</h1>
        <p>Event Management</p>
        <p>Online Registration</p>
        <p>Online RSVP</p>
        <p>Music Venues & Promoters</p>
      </div>
    </div>
  );
}

export default Footer;
