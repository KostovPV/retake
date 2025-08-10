import React, { useMemo } from 'react';
import { convertToEuropeanDate } from '../utils/dateUtils';
import './TopActorPair.css';
import { FaUserFriends, FaFilm } from 'react-icons/fa';

// extra guard so we don’t crash on bad/empty dates
const safeDate = (d) => {
  try {
    return convertToEuropeanDate(d) || 'Unknown date';
  } catch {
    return 'Unknown date';
  }
};

function TopActorPair({ actors = [], roles = [], movies = [] }) {
  const topPair = useMemo(() => {
    // Must have at least 2 actors, 1 role, 1 movie to compute anything useful
    if (!Array.isArray(actors) || !Array.isArray(roles) || !Array.isArray(movies)) return null;
    if (actors.length < 2 || roles.length === 0 || movies.length === 0) return null;

    const actorsByMovie = {};

    //Step 1: Group actors by MovieID (skip malformed rows)
    for (const r of roles) {
      const MovieID = r?.MovieID;
      const ActorID = r?.ActorID;
      if (!MovieID || !ActorID) continue;

      if (!actorsByMovie[MovieID]) {
        actorsByMovie[MovieID] = new Set();
      }
      actorsByMovie[MovieID].add(String(ActorID));
    }

    const movieBuckets = Object.values(actorsByMovie);
    if (movieBuckets.length === 0) return null;

    const coAppearanceCounts = {};

    //Step2: Count co-appearances
    for (const set of movieBuckets) {
      const arr = Array.from(set);
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const pair = [arr[i], arr[j]].sort();
          const key = pair.join('-');
          coAppearanceCounts[key] = (coAppearanceCounts[key] || 0) + 1;
        }
      }
    }

    //Step3:  Find the top pair
    let topKey = null;
    let maxCount = 0;
    for (const [key, count] of Object.entries(coAppearanceCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topKey = key;
      }
    }
    if (!topKey) return null;

    const [id1, id2] = topKey.split('-');
    const actor1 = actors.find((a) => String(a?.ID) === String(id1));
    const actor2 = actors.find((a) => String(a?.ID) === String(id2));
    if (!actor1 || !actor2) return null;

    // Collect shared movies (both actors appear)
    const byMovie = roles.reduce((acc, r) => {
      const mId = r?.MovieID;
      const aId = r?.ActorID;
      if (!mId || !aId) return acc;
      if (!acc[mId]) acc[mId] = new Set();
      acc[mId].add(String(aId));
      return acc;
    }, {});

    const sharedMovies = Object.entries(byMovie)
      .filter(([, set]) => set.has(String(id1)) && set.has(String(id2)))
      .map(([mId]) => movies.find((m) => String(m?.ID) === String(mId)))
      .filter(Boolean);

    return {
      actor1,
      actor2,
      count: maxCount,
      sharedMovies,
    };
  }, [actors, roles, movies]);

  // User friendly empty messages
  if (!Array.isArray(actors) || !Array.isArray(roles) || !Array.isArray(movies)) {
    return <div className="top-actor-pair empty">Data is not available yet.</div>;
  }
  if (actors.length < 2) {
    return <div className="top-actor-pair empty">Add at least two actors to see co-stars.</div>;
  }
  if (roles.length === 0) {
    return <div className="top-actor-pair empty">Add some roles to find co-star pairs.</div>;
  }
  if (movies.length === 0) {
    return <div className="top-actor-pair empty">Add movies to compute co-stars.</div>;
  }
  if (!topPair) {
    return <div className="top-actor-pair empty">No top actor pair found yet.</div>;
  }

  return (
    <div className="top-actor-pair">
      <h2 className="section-title">
        <FaUserFriends className="section-icon" /> Most Frequent Co-Stars
      </h2>

      <div className="actor-pair-names">
        <strong>{topPair.actor1.FullName || 'Unknown'}</strong> &{' '}
        <strong>{topPair.actor2.FullName || 'Unknown'}</strong>
      </div>

      <p className="actor-pair-count">
        Appeared together in <strong>{topPair.count}</strong> movies.
      </p>

      <h3 className="shared-movies-header">
        <FaFilm className="icon-title" /> Co-Starred Films
      </h3>

      {topPair.sharedMovies.length === 0 ? (
        <p>No shared films found.</p>
      ) : (
        <ul className="shared-movies-list">
          {topPair.sharedMovies.map((movie) => (
            <li key={movie.ID || Math.random()} className="shared-movie-item">
              <span className="movie-title">{movie?.Title || 'Untitled'}</span>
              <span className="movie-date">{safeDate(movie?.ReleaseDate)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopActorPair;
