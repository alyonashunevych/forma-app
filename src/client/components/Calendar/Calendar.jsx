import "./Calendar.scss";
import editprofile from "../../../images/edit-profile.svg";
import { Link } from "react-router-dom";
import userphoto from "../../../images/userphoto.jpg";

export function Calendar() {
  return (
    <div className="calendar">
      <div className="calendar__profile">
        <p className="calendar__profile__title">Profile</p>
        <Link to="profile">
          <img
            src={editprofile}
            alt="edit profile"
            className="calendar__profile__icon"
          />
        </Link>
      </div>

      <div className="calendar__user">
        <img
          src={userphoto}
          alt="user photo"
          className="calendar__user__photo"
        />
        
        <p className="calendar__user__name">Alyona Shunevych</p>
        <div className="calendar__user__params">
          <div className="calendar__user__params__item">
            <p className="calendar__user__params__key">Age</p>
            <div className="calendar__user__params__value calendar__user__params__value--blue">
              <p className="calendar__user__params__value__text">
                <span style={{ fontSize: "1.25vw" }}>20</span> yrs
              </p>
            </div>
          </div>
          <div className="calendar__user__params__item">
            <p className="calendar__user__params__key">Height</p>
            <div className="calendar__user__params__value calendar__user__params__value--green">
              <p className="calendar__user__params__value__text">
                <span style={{ fontSize: "1.25vw" }}>158</span> cm
              </p>
            </div>
          </div>
          <div className="calendar__user__params__item">
            <p className="calendar__user__params__key">Weight</p>
            <div className="calendar__user__params__value calendar__user__params__value--orange">
              <p className="calendar__user__params__value__text">
                <span style={{ fontSize: "1.25vw" }}>45</span> kg
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
