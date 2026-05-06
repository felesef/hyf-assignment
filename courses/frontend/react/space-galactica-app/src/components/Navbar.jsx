import classNames from 'classnames';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Planet } from '../icons/Planet';
import { Badge } from './Badge';
import styles from './Navbar.module.css';

const navbarItems = [
  {
    title: 'ABOUT US',
    link: '/about_us',
  },
  {
    title: 'DESTINATION',
    link: '/destination',
  },
  {
    title: 'NASA COLLABORATION',
    link: '/nasa_collaboration',
  }
];

const NavItem = ({ title, link, isActive, index }) => {
  return (
    <li className={classNames(styles.navbarLinks, {
      [styles.isLinkActive]: isActive,
    })}>
      <Link to={link}>
        <b>{index}</b> {title}
      </Link>
    </li>
  );
};

export const Navbar = () => {
  const currentPath = useLocation().pathname;

  return (
    <header className={styles.headerContainer}>
      <div className={styles.navbarLogo}>
        <a href="/"><img src="/shared/logo.svg" alt="" /> GALACTICA</a>
      </div>
      <div className={styles.decorativeLine} />
      <nav className={styles.navbar}>
        <div className={styles.navbarBG} />
        <ul className={styles.navbarList}>
          {/* 🧑🏽‍🚀 Task - Week 2 */}
          {/* Create a <NavItem> component, which accepts the following props: title, link, isActive.  */}
          <NavItem
            index="01"
            title={navbarItems[0].title}
            link={navbarItems[0].link}
            isActive={navbarItems[0].link === currentPath}
          />
          <NavItem
            index="02"
            title={navbarItems[1].title}
            link={navbarItems[1].link}
            isActive={navbarItems[1].link === currentPath}
          />
          <NavItem
            index="03"
            title={navbarItems[2].title}
            link={navbarItems[2].link}
            isActive={navbarItems[2].link === currentPath}
          />
          {/* 🧑🏽‍🚀 Task - Week 3 */}
          {/* Replace repeating content by using .map() and the previously created NavItem component. */}
          <li className={styles.wishlistBadge} aria-label="Wishlist">
          </li>
        </ul>
        {/* 🧑🏽‍🚀 Task - Week 4 - part 3 */}
        {/* Take the count of the planets wishlist from the context and display it in the Badge. */}
        <Badge count={0}>
          <Planet color="white"  />
        </Badge>
      </nav>
    </header>
  );
}