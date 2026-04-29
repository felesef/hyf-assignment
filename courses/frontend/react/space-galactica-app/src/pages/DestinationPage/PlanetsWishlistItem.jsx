import styles from "./DestinationPage.module.css";

export const PlanetsWishlistItem = ({ name, thumbnail, onRemove }) => {
  return (
    <div className={styles.wishlistItem}>
      <img className={styles.wishlistItemThumbnail} src={thumbnail} alt={name} />
      <b>{name.toUpperCase()}</b>
      <button onClick={onRemove}>remove</button>
    </div>
  );
};
