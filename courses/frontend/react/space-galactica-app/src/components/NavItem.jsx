import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export const NavItem = ({ title, link, isActive, index }) => {
  return (
    <li
      className={classNames(styles.navbarLinks, {
        [styles.isLinkActive]: isActive,
      })}
    >
      <Link to={link}>
        <b>{index}</b> {title}
      </Link>
    </li>
  );
};
