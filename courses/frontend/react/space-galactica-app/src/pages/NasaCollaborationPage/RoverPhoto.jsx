import styles from "./NasaCollaborationPage.module.css";

export const RoverPhoto = ({ src, date, roverName }) => {
  return (
    <figure className={styles.roverFigure}>
      <img
        className={styles.roverImg}
        src={src}
        alt={`${roverName} rover · ${date}`}
      />
      <figcaption className={styles.roverCaption}>
        {roverName} · {date}
      </figcaption>
    </figure>
  );
};
