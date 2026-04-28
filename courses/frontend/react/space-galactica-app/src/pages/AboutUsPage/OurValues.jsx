import styles from './OurValues.module.css';

const VALUES = [
  {
    id: 'exploration',
    title: 'Exploration',
    description:
      'We are driven by a deep-seated desire to explore the unknown. We believe that the pursuit of discovery is at the heart of human nature, and we are committed to pushing the boundaries of what is possible.',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description:
      'At Galactica, we prioritize cutting-edge technology and innovation. We are constantly evolving our spacecraft, safety protocols, and services to ensure that our travelers experience the most advanced and secure space journeys available.',
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description:
      'We are committed to making space exploration sustainable for future generations. Our space missions are designed to minimize environmental impact, both on Earth and in space, and to foster a spirit of responsibility towards our universe.',
  },
  {
    id: 'community',
    title: 'Community',
    description:
      'We believe in the power of collective exploration. Our journeys are not just about reaching new destinations; they are about building a community of space enthusiasts who share a passion for the stars.',
  },
];

export const OurValues = () => {
  return (
    <ul className={styles.list}>
      {VALUES.map((value) => (
        <li key={value.id} className={styles.item}>
          <h3 className={styles.title}>{value.title}</h3>
          <p className={styles.text}>{value.description}</p>
        </li>
      ))}
    </ul>
  );
};
