import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const tabs = [
  { title: "Home", to: "" },
  { title: "Test", to: "test" },
  { title: "About-Test", to: "about-test" },
  { title: "About-Us", to: "about-us" },
  { title: "Data", to: "data" },
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
