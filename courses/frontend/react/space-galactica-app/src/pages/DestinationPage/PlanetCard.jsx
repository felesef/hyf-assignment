import styles from "./DestinationPage.module.css";

export const PlanetCard = ({
  name,
  description,
  thumbnail,
  isSelected,
  togglePlanetSelection,
}) => {
  return (
    <div className={styles.planetCard}>
      <img className={styles.planetThumbnail} src={thumbnail} alt={name} />
      <div className={styles.planetDescription}>
        <h2>{name.toUpperCase()} {isSelected ? "- SELECTED" : ""}</h2>
        <p>{description}</p>
      </div>
      <button
        className="roundButton"
        onClick={() => togglePlanetSelection(name, thumbnail)}
      >
        {isSelected ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
      </button>
    </div>
  );
};
