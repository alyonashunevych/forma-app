import "./UserProfile.scss";
import editprofile from "../../../images/edit-profile.svg";
import { Link } from "react-router-dom";
import userphoto from "../../../images/userphoto.jpg";
import { MyCalendar } from "./MyCalendar/MyCalendar";

export function UserProfile() {
  return (
    <div className="user-profile">
      <div className="user-profile__profile">
        <p className="user-profile__profile__title">Profile</p>
        <Link to="profile">
          <img
            src={editprofile}
            alt="edit profile"
            className="user-profile__profile__icon"
          />
        </Link>
      </div>

      <div className="user-profile__user">
        <img
          src={userphoto}
          alt="user photo"
          className="user-profile__user__photo"
        />

        <p className="user-profile__user__name">Alyona Shunevych</p>
        <div className="user-profile__user__params">
          <div className="user-profile__user__params__item">
            <p className="user-profile__user__params__key">Age</p>
            <div className="user-profile__user__params__value user-profile__user__params__value--blue">
              <p className="user-profile__user__params__value__text">
                <span style={{ fontSize: "1.25vw" }}>20</span> yrs
              </p>
            </div>
          </div>
          <div className="user-profile__user__params__item">
            <p className="user-profile__user__params__key">Height</p>
            <div className="user-profile__user__params__value user-profile__user__params__value--green">
              <p className="user-profile__user__params__value__text">
                <span style={{ fontSize: "1.25vw" }}>158</span> cm
              </p>
            </div>
          </div>
          <div className="user-profile__user__params__item">
            <p className="user-profile__user__params__key">Weight</p>
            <div className="user-profile__user__params__value user-profile__user__params__value--orange">
              <p className="user-profile__user__params__value__text">
                <span style={{ fontSize: "1.25vw" }}>45</span> kg
              </p>
            </div>
          </div>
        </div>
      </div>

      <MyCalendar />
    </div>
  );
}
