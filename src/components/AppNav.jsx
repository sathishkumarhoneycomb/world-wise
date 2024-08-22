import { NavLink } from "react-router-dom";
import Style from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={Style.nav}>
      <ul>
        <li>
          <NavLink to="cities"> Cites </NavLink>
        </li>
        <li>
          <NavLink to="countries"> Countries </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
