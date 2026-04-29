import { Link, useLocation } from "react-router-dom";
import styles from './Footer.module.css';

const PAGES = [
  { to: "/", label: "Home" },
  { to: "/about_us", label: "About us" },
  { to: "/destination", label: "Destination" },
  { to: "/nasa_collaboration", label: "NASA Collaboration" },
];

const SOCIAL_LINKS = [
  { url: "https://facebook.com", title: "Facebook", icon: "🌐" },
  { url: "https://instagram.com", title: "Instagram", icon: "📸" },
  { url: "https://tiktok.com", title: "TikTok", icon: "🎵" },
  { url: "https://google.com", title: "On the streets at night", icon: "✨" },
  { url: "https://linkedin.com", title: "LinkedIn", icon: "💼" },
];

const SocialMediaItem = ({ url, title, icon }) => {
  return (
    <li>
      <a href={url} target="_blank" rel="noreferrer">
        {icon} {title}
      </a>
    </li>
  );
};

export const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer className={pathname !== "/" ? styles.footer : styles.hidden}>
      <div className={styles.footerDescription}>
        <h3>Galactica</h3>
        <p>Explore the universe and beyond. Your journey to the stars starts here.</p>
        <p>&copy; 2024 Galactica. All rights reserved.</p>
      </div>
      {/* 🧑🏽‍🚀 Task - Week 2 */}
      {/* Create a new list for the Pages. */}
      {/* We need to use the <Link /> component here. */}
      {/* Docs for the Link: https://reactrouter.com/api/components/Link#link. */}
      <div className={styles.footerLinks}>
        <h3>Pages</h3>
        <ul className={styles.footerList}>
          {PAGES.map((page) => (
            <li key={page.to}>
              <Link to={page.to}>{page.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.footerLinks}>
        <h3>Follow us</h3>
        <ul className={styles.footerList}>
          {SOCIAL_LINKS.map((socialLink) => (
            <SocialMediaItem
              key={socialLink.title}
              url={socialLink.url}
              title={socialLink.title}
              icon={socialLink.icon}
            />
          ))}
          {/* 🧑🏽‍🚀 Task - Week 2 */}
          {/* Create a <SocialMediaItem /> component and replace all of the list items! */}
          {/* SocialMediaItem should accept the following props: url, title, icon. */}
          {/* For the icons, you can download 1-2 social media icons for testing and put it in the /public/socialmedia/ folder. */}
        </ul>
      </div>
    </footer>
  );
}
