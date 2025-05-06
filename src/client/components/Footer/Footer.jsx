import "./Footer.scss";
import logo from "../../../images/logo.svg";

export function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="logo" className="footer__logo" />
      <p className="footer__text">© 2025 FORMA. All rights reserved.</p>
    </footer>
  );
}
