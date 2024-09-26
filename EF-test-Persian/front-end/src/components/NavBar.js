import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const tabs = [
  { title: "صفحه اصلی", to: "" },
  { title: "آزمون", to: "test" },
  { title: "درباره آزمون", to: "about-test" },
  { title: "درباره ما", to: "about-us" },
  { title: "داده ها", to: "data" },
];
function NavBar() {
  const [showNav, setShowNav] = useState(false);

  const toggleShowNav = () => setShowNav((previousShowNav) => !previousShowNav);
  return (
    <div className="NavBar">
      <button className="menu-button" onClick={toggleShowNav}></button>
      <nav className={showNav ? "" : "hidden"} id="nav">
        <ul>
          {tabs.map(({ title, to }) => (
            <li key={title}>
              <NavLink to={to} onClick={() => setShowNav(false)}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Link to="" className="logo" onClick={() => setShowNav(false)}></Link>
    </div>
  );
}

export default NavBar;
