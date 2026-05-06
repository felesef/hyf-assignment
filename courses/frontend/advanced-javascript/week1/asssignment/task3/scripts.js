// Task 3

document.addEventListener("DOMContentLoaded", () => {
  const MAX_PREVIEW = 25;
  const MAX_PREVIEW_LINES = 10;

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  if (typeof movies === "undefined") {
    setText("task-1", "Error: movies.js did not load (movies is undefined).");
    return;
  }

// tools
  function getTag(rating) {
    if (rating >= 7) return "Good";
    if (rating >= 4) return "Average";
    return "Bad";
  }

  function addTag(movies) {
    let tagged = [];
    for (let i = 0; i < movies.length; i++) {
      const tag = getTag(movies[i].rating);
      tagged.push({ ...movies[i], tag });
    }
    return tagged;
  }

  function getListSuffix(totalLength, limit) {
    if (totalLength <= limit) return "";
    return `\n... (+${totalLength - limit} more)`;
  }

  function isDuplicatedTitle(title) {
    const normalized = String(title).toLowerCase().replace(/[^a-z0-9 ]/g, "");
    const words = normalized.split(" ").filter(Boolean);
    const unique = new Set(words);
    return words.length !== unique.size;
  }


  // Task 1
  function getShortTitle(movies) {
    let result = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].title.length <= 5) {
        result.push(movies[i].title);
      }
    }
    return result;
  }


  // Task 2
  function getLongTitle(movies) {
    let result = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].title.length > 50) {
        result.push(movies[i].title);
      }
    }
    return result;
  }


  // Task 3
  function getMoviesIn1980s(movies) {
    let result = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].year >= 1980 && movies[i].year <= 1989) {
        result.push(movies[i]);
      }
    }
    return result;
  }


  // Task 4
  function getTaggedMovies(movies) {
    return addTag(movies);
  }


  // Task 5
  function getHighRatedMovies(movies) {
    return movies
      .filter((movie) => movie.rating > 6)
      .map((movie) => `${movie.title} - ${Number(movie.rating).toFixed(1)}`);
  }


  // Task 6
  function countMoviesByKeyword(movies) {
    let count = 0;
    for (let i = 0; i < movies.length; i++) {
      const title = String(movies[i].title).toLowerCase();
      if (title.includes("surfer")) count++;
      if (title.includes("alien")) count++;
      if (title.includes("benjamin")) count++;
    }
    return count;
  }


  // Task 7
  function findDuplicated(movies) {
    let duplicatedWordTitles = [];
    for (let i = 0; i < movies.length; i++) {
      if (isDuplicatedTitle(movies[i].title)) {
        duplicatedWordTitles.push(movies[i].title);
      }
    }
    return duplicatedWordTitles;
  }


  // Task 8
  function getAverageRating(movies) {
    return (
      movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length
    );
  }


  // Task 9
  function countRatedMovies() {
    const taggedMovies = addTag(movies);
    const tags = taggedMovies.map((movie) => movie.tag);

    return tags.reduce(
      (accumulator, element) => {
        if (element === "Good") accumulator.goodMovies++;
        else if (element === "Average") accumulator.averageMovies++;
        else accumulator.badMovies++;
        return accumulator;
      },
      { goodMovies: 0, averageMovies: 0, badMovies: 0 }
    );
  }

  // Render the results into the cards
  const shortTitles = getShortTitle(movies);
  setText(
    "task-1",
    `Short Titles (<= 5 chars)\nCount: ${shortTitles.length}\n${shortTitles
      .slice(0, MAX_PREVIEW)
      .join(", ")}${getListSuffix(shortTitles.length, MAX_PREVIEW)}`
  );

  const longTitles = getLongTitle(movies);
  setText(
    "task-2",
    `Long Titles (> 50 chars)\nCount: ${longTitles.length}\n${longTitles
      .slice(0, MAX_PREVIEW)
      .join(", ")}${getListSuffix(longTitles.length, MAX_PREVIEW)}`
  );

  const movies1980s = getMoviesIn1980s(movies);
  const first10 = movies1980s
    .slice(0, MAX_PREVIEW_LINES)
    .map((m) => `${m.title} (${m.year})`)
    .join("\n");
  setText(
    "task-3",
    `Movies from 1980-1989 (inclusive)\nCount: ${movies1980s.length}\nFirst 10:\n${first10}`
  );

  const taggedMovies = getTaggedMovies(movies);
  const first25Tagged = taggedMovies
    .slice(0, MAX_PREVIEW)
    .map((m) => `${m.title} (${m.year}) - ${m.tag}`)
    .join("\n");
  setText(
    "task-4",
    `Tagged Movies (Good/Average/Bad)\nCount: ${taggedMovies.length}\nFirst ${Math.min(
      MAX_PREVIEW,
      taggedMovies.length
    )}:\n${first25Tagged}${getListSuffix(
      taggedMovies.length,
      MAX_PREVIEW
    )}`
  );

  const ratingsOver6 = getHighRatedMovies(movies);
  setText(
    "task-5",
    `Ratings > 6\nCount: ${ratingsOver6.length}\nFirst ${Math.min(
      MAX_PREVIEW,
      ratingsOver6.length
    )}:\n${ratingsOver6.slice(0, MAX_PREVIEW).join("\n")}${getListSuffix(
      ratingsOver6.length,
      MAX_PREVIEW
    )}`
  );

  const keywordCount = countMoviesByKeyword(movies);
  setText(
    "task-6",
    `Keyword Count (case-insensitive)\nSurfer + Alien + Benjamin (counted separately)\nTotal: ${keywordCount}`
  );

  const duplicatedWordTitles = findDuplicated(movies);
  setText(
    "task-7",
    `Duplicated-word Titles\nCount: ${duplicatedWordTitles.length}\nFirst ${Math.min(
      MAX_PREVIEW,
      duplicatedWordTitles.length
    )}:\n${duplicatedWordTitles
      .slice(0, MAX_PREVIEW)
      .join("\n")}${getListSuffix(duplicatedWordTitles.length, MAX_PREVIEW)}`
  );

  const averageRating = getAverageRating(movies);
  setText("task-8", `Average rating: ${averageRating.toFixed(2)}`);

  const counts = countRatedMovies();
  setText(
    "task-9",
    `Good/Average/Bad counts (reduce)\n${JSON.stringify(counts, null, 2)}`
  );
});

