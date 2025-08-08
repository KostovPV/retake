import React, { useMemo } from 'react';
import { convertToEuropeanDate } from '../utils/dateUtils';
import './TopActorPair.css';
import { FaUserFriends, FaFilm } from 'react-icons/fa';

function TopActorPair({ actors, roles, movies }) {
  const topPair = useMemo(() => {
    const actorsByMovie = {};

    // Step 1: Group actors by MovieID
    roles.forEach(({ MovieID, ActorID }) => {
      if (!actorsByMovie[MovieID]) {
        actorsByMovie[MovieID] = new Set();
      }
      actorsByMovie[MovieID].add(ActorID);
    });

    const coAppearanceCounts = {};

    // Step 2: Count co-appearances
    for (const actorSet of Object.values(actorsByMovie)) {
      const actorArray = Array.from(actorSet);
      for (let i = 0; i < actorArray.length; i++) {
        for (let j = i + 1; j < actorArray.length; j++) {
          const pair = [actorArray[i], actorArray[j]].sort();
          const key = pair.join('-');
          coAppearanceCounts[key] = (coAppearanceCounts[key] || 0) + 1;
        }
      }
    }

    // Step 3: Find the most frequent pair
    let topPairKey = null;
    let maxCount = 0;
    for (const [key, count] of Object.entries(coAppearanceCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topPairKey = key;
      }
    }

    if (!topPairKey) return null;

    const [id1, id2] = topPairKey.split('-');
    const actor1 = actors.find((a) => a.ID === id1);
    const actor2 = actors.find((a) => a.ID === id2);

    // Step 4: Get shared movies
    const sharedMovieIDs = roles
      .filter((r) => r.ActorID === id1 || r.ActorID === id2)      .reduce((acc, r) => {
        if (!acc[r.MovieID]) acc[r.MovieID] = new Set();
        acc[r.MovieID].add(r.ActorID);
        return acc;
      }, {});

    const sharedMovies = Object.entries(sharedMovieIDs)
      .filter(([_, actorSet]) => actorSet.has(id1) && actorSet.has(id2))
      .map(([movieID]) => movies.find((m) => m.ID === movieID))
      .filter(Boolean);

    return {
      actor1,
      actor2,
      count: maxCount,
      sharedMovies,
    };
  }, [actors, roles, movies]);

  if (!topPair) return <div>No top actor pair found.</div>;

  return (
    <div className="top-actor-pair">
      <h2 className="section-title">
        <FaUserFriends className="section-icon" /> Most Frequent Co-Stars
      </h2>
      <div className="actor-pair-names">
        <strong>{topPair.actor1.FullName}</strong> & <strong>{topPair.actor2.FullName}</strong>
      </div>
      <p className="actor-pair-count">
        Appeared together in <strong>{topPair.count}</strong> movies.
      </p>

      <h3 className="shared-movies-header">
        <FaFilm className="icon-title" /> Co-Starred Films
      </h3>
      <ul className="shared-movies-list">
        {topPair.sharedMovies.map((movie) => (
          <li key={movie.ID} className="shared-movie-item">
            <span className="movie-title">{movie.Title}</span>
            <span className="movie-date">{convertToEuropeanDate(movie.ReleaseDate)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopActorPair;
