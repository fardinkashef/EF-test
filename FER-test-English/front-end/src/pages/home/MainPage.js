import "./MainPage.scss";
import { NavLink } from "react-router-dom";
function MainPage() {
  return (
    <div className="MainPage">
      <div className="welcome">
        <h2>
          Welcome to
          {/* <br /> */}
          <span> Facial Effect Recognition Test</span>
          {/* <br /> */}
        </h2>

        <NavLink to="./test"> Start the Test </NavLink>
      </div>
      <img src={require("assets/icons/mainpage.jpg")} />
    </div>
  );
}
export default MainPage;
