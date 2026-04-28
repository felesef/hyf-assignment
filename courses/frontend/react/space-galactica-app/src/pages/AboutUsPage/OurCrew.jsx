import styles from './OurCrew.module.css';

const CREW_INTRO =
  'Our crew is the heart and soul of Galactica. We are a diverse team of seasoned space explorers, engineers, and visionaries who are united by a common goal: to make space travel accessible and exciting for all.';

const CREW_MEMBERS = [
  {
    id: 'sarah-vega',
    name: 'Captain Sarah Vega',
    role: 'Captain',
    image: '/crew/image-anousheh-ansari.png',
    bio: 'A former NASA astronaut with over 15 years of experience, Captain Vega leads our missions with unparalleled expertise and a passion for space exploration.',
  },
  {
    id: 'leo-redding',
    name: 'Dr. Leo Redding',
    role: 'Chief astrophysicist',
    image: '/crew/image-douglas-hurley.png',
    bio: 'Our chief astrophysicist, Dr. Redding, is a renowned scientist who has contributed to major space discoveries. He ensures that every journey is as educational as it is exhilarating.',
  },
  {
    id: 'hana-lee',
    name: 'Chief Engineer Hana Lee',
    role: 'Chief engineer',
    image: '/crew/image-mark-shuttleworth.png',
    bio: 'With her extensive background in aerospace engineering, Hana Lee is responsible for the state-of-the-art technology that powers our spacecraft. Her innovation ensures that our travelers are always in safe hands.',
  },
  {
    id: 'alex-santos',
    name: 'Mission Specialist Alex Santos',
    role: 'Mission specialist',
    image: '/crew/image-victor-glover.png',
    bio: 'As a mission specialist, Alex’s job is to ensure that every aspect of the journey runs smoothly. With a background in both science and adventure tourism, Alex is the perfect guide for our space travelers.',
  },
  {
    id: 'maya-patel',
    name: 'Crew Member Maya Patel',
    role: 'Crew member',
    image: '/crew/image-douglas-hurley.webp',
    bio: 'Maya brings a unique blend of technical skills and customer service experience to the team. She’s always ready to assist with any needs and to make sure every traveler has an unforgettable experience.',
  },
];

export const OurCrew = () => {
  return (
    <div className={styles.root}>
      <p className={styles.intro}>{CREW_INTRO}</p>
      <div className={styles.grid}>
        {CREW_MEMBERS.map((member) => (
          <article key={member.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <img
                className={styles.image}
                src={member.image}
                alt={member.name}
                loading="lazy"
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.bio}>{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
