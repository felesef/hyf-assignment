import styles from './OurPartners.module.css';

const PARTNER_LOGOS = [
  { id: 'alphabet', src: '/business_partners/alphabet-logo.png', name: 'Alphabet' },
  { id: 'amazon', src: '/business_partners/amazon_logo.png', name: 'Amazon' },
  { id: 'cbc', src: '/business_partners/CBC_Logo_White.png', name: 'CBC' },
  { id: 'microsoft', src: '/business_partners/Microsoft-Logo-white.png', name: 'Microsoft' },
  { id: 'nyu', src: '/business_partners/nyu-logo.png', name: 'NYU' },
  { id: 'queens', src: '/business_partners/QueensLogo_white.png', name: "Queen's University" },
  { id: 'samsung', src: '/business_partners/samsung-logo.png', name: 'Samsung' },
  { id: 'sodexo', src: '/business_partners/sodexo-logo.png', name: 'Sodexo' },
];

export const OurPartners = () => {
  return (
    <div className={styles.root}>
      <p className={styles.lead}>
        We collaborate with some of the most respected names in the space and technology industries
        to make every journey extraordinary.
      </p>
      <ul className={styles.grid}>
        {PARTNER_LOGOS.map((partner) => (
          <li key={partner.id} className={styles.cell}>
            <img className={styles.logo} src={partner.src} alt={partner.name} loading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  );
};
