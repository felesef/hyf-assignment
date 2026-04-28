import { OurCrew } from './OurCrew.jsx';
import { OurPartners } from './OurPartners.jsx';
import { OurValues } from './OurValues.jsx';
import styles from './AboutUsPage.module.css';

const MISSION =
  'At Galactica, our mission is to unlock the wonders of the universe for everyone. We believe that space is the final frontier and that the opportunity to explore it should be within everyone’s reach. Our journeys are designed to inspire, educate, and provide a once-in-a-lifetime experience that transcends the ordinary.';

export const AboutUsPage = () => {
  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>About us</h1>
        <section className="card">
          <h2>Our mission</h2>
          <p className={styles.mission}>{MISSION}</p>
        </section>
        <section className="card">
          <h2>Our values</h2>
          <OurValues />
        </section>
        <section className="card">
          <h2>The crew</h2>
          <OurCrew />
        </section>
        <section className="card">
          <h2>Our partners</h2>
          <OurPartners />
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
