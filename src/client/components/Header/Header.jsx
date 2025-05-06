import "./Header.scss";
import logo from "../../../images/logo.svg";

export function Header() {
  return (
    <header className="header">
      <nav className="navigation">
        <img src={logo} alt="logo" className="header__logo" />

        <ul className="navigation__list">
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              About
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              How It Works
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Plans
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              FAQ
            </a>
          </li>
        </ul>
      </nav>
      <div className="header__buttons">
        <button className="header__button__login"></button>
        <button className="header__button__signup">Sign Up</button>
      </div>
    </header>
  );
}
