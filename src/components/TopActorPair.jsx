import React, { useMemo } from 'react';
import { formatDate } from '../utils/formatDate'; // adjust path if needed

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
    const actor1 = actors.find(actor => actor.ID === id1);
    const actor2 = actors.find(actor => actor.ID === id2);

    // Step 4: Get shared movies
    const sharedMovieIDs = roles
      .filter(role =>
        role.ActorID === id1 || role.ActorID === id2
      )
      .reduce((acc, role) => {
        if (!acc[role.MovieID]) acc[role.MovieID] = new Set();
        acc[role.MovieID].add(role.ActorID);
        return acc;
      }, {});

    const sharedMovies = Object.entries(sharedMovieIDs)
      .filter(([_, actorSet]) => actorSet.has(id1) && actorSet.has(id2))
      .map(([movieID]) => movies.find(movie => movie.ID === movieID))
      .filter(Boolean); // just in case

    return {
      actor1,
      actor2,
      count: maxCount,
      sharedMovies
    };
  }, [actors, roles, movies]);

  if (!topPair) return <div>No top pair found.</div>;

  return (
    <div>
      <h2>Top Actor Pair</h2>
      <p>
        <strong>{topPair.actor1.FullName}</strong> and <strong>{topPair.actor2.FullName}</strong>{' '}
        have co-starred in <strong>{topPair.count}</strong> movies together.
      </p>

      <h3>Shared Movies:</h3>
      <ul>
        {topPair.sharedMovies.map((movie) => (
          <li key={movie.ID}>
            {movie.Title} — <em>{formatDate(movie.ReleaseDate)}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopActorPair;
