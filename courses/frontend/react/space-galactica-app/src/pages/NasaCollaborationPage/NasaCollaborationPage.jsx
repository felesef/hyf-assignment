import { useState, useEffect } from "react";
import styles from "./NasaCollaborationPage.module.css";
import { RoverPhoto } from "./RoverPhoto.jsx";

// Read "/app/nasa_collaboration/README.md" for more info about the API_KEY
// You need a proper API_KEY for the requests to work
const API_KEY = "API_KEY";

const NASA_URLs = {
  astronomyPicOfTheDay: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
  marsRoverPhoto: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${API_KEY}`,
};

export const NasaCollaboration = () => {
  const [dailyImg, setDailyImg] = useState({});
  const [roverPhoto, setRoverPhoto] = useState({});
  const [apodError, setApodError] = useState(null);
  const [roverError, setRoverError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchRoverPhotos = async () => {
      try {
        const response = await fetch(NASA_URLs.marsRoverPhoto);
        const roverPhotoResponse = await response.json();
        if (!cancelled) {
          setRoverPhoto(roverPhotoResponse);
          setRoverError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setRoverError("Could not load rover photos.");
        }
      }
    };

    const fetchApod = async () => {
      try {
        const response = await fetch(NASA_URLs.astronomyPicOfTheDay);
        const data = await response.json();
        if (!cancelled) {
          setDailyImg(data);
          setApodError(data?.error?.message ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setApodError("Could not load Astronomy Picture of the Day.");
        }
      }
    };

    fetchRoverPhotos();

    // 🧑🏽‍🚀 Task - Week 3
    // Fetch the extra data for NASA_URLs.astronomyPicOfTheDay and save it to the dailyImg state variable.
    fetchApod();

    return () => {
      cancelled = true;
    };
  }, []);

  const apodImageUrl = dailyImg.url || dailyImg.hdurl;

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>Collaboration with NASA</h1>
        <section className="card">
          <h2>Astronomy Picture of the day</h2>
          {/* 🧑🏽‍🚀 Task - Week 3 */}
          {/* After fetching data from the NASA_URLs.astronomyPicOfTheDay url, display the returned data here. */}
          {/* You should display the title, explanation, and the image using the url from the response */}
          {apodError ? (
            <p>{apodError}</p>
          ) : dailyImg.title ? (
            <>
              <h3>{dailyImg.title}</h3>
              <p>{dailyImg.explanation}</p>
              {apodImageUrl && (
                <img
                  className={styles.nasaPicOfTheDayImg}
                  src={apodImageUrl}
                  alt={dailyImg.title}
                />
              )}
            </>
          ) : (
            <p>Loading astronomy picture...</p>
          )}
        </section>
        <section className="card">
          <h2>Rover Photos</h2>
          {/* 🧑🏽‍🚀 Task - Week 3 */}
          {/* Iterate over the roverPhoto?.photos array and display all the pictures. */}
          {roverError ? (
            <p>{roverError}</p>
          ) : roverPhoto?.photos?.length ? (
            <div className={styles.roverGrid}>
              {/* 🧑🏽‍🚀 Task - Week 3 */}
              {/* Create a react component for the <RoverPhoto />, which should accept the following props: */}
              {/* 1. src: source of the img; */}
              {/* 2. date: earth_date data coming from the API; */}
              {/* 3. roverName: will be in the rover object. */}
              {/* If you don't know how the data looks like you can log it out to the console and investigate in the browser's devtools. */}
              {roverPhoto.photos.map((photo) => (
                <RoverPhoto
                  key={photo.id}
                  src={photo.img_src}
                  date={photo.earth_date}
                  roverName={photo.rover?.name ?? "Curiosity"}
                />
              ))}
            </div>
          ) : (
            <p>Loading rover photos...</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default NasaCollaboration;
