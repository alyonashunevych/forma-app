import { Link } from "react-router-dom";
import arrow from "../../../images/main-but-arrow.svg";

import "./NotFound.scss";

export function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404 – Page Not Found</h1>
      <p className="not-found__description">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link to="/">
        <button className="not-found__button">
          Go back home
          <div className="not-found__button__circle">
            <img src={arrow} alt="arrow" className="not-found__button__arrow" />
          </div>
        </button>
      </Link>
    </div>
  );
}
