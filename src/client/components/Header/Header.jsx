import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../../images/logo.svg";

export function Header() {
  return (
    <header className="header">
      <nav className="navigation">
        <a href="#">
          <img src={logo} alt="logo" className="header__logo" />
        </a>

        <ul className="navigation__list">
          <li className="navigation__item">
            <a href="#about" className="navigation__link">
              About
            </a>
          </li>
          <li className="navigation__item">
            <a href="#how-it-works" className="navigation__link">
              How It Works
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Plans
            </a>
          </li>
          <li className="navigation__item">
            <a href="#faq" className="navigation__link">
              FAQ
            </a>
          </li>
        </ul>
      </nav>
      <div className="header__buttons">
        <Link to="/login">
          <button className="header__button__login"></button>
        </Link>
        <button className="header__button__signup">Sign Up</button>
      </div>
    </header>
  );
}
