import { createContext, useEffect, useState } from "react";
import { parseCSV } from "../utils/csvParser";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [roles,  setRoles ]  = useState([]);
  const [loading, setLoading] = useState(true); // <- NEW

  useEffect(() => {
    let cancelled = false;

    const finalize = (a, m, r) => {
      if (cancelled) return;
      setActors(a);
      setMovies(m);
      setRoles(r);
      setLoading(false);        // <- done
    };

    try {
      const storedActors = JSON.parse(localStorage.getItem("actors") || "null");
      const storedMovies = JSON.parse(localStorage.getItem("movies") || "null");
      const storedRoles  = JSON.parse(localStorage.getItem("roles")  || "null");

      if (storedActors && storedMovies && storedRoles) {
        finalize(storedActors, storedMovies, storedRoles);
      } else {
        (async () => {
          const [actorsText, moviesText, rolesText] = await Promise.all([
            fetch("/src/data/actors.csv").then((r) => r.text()),
            fetch("/src/data/movies.csv").then((r) => r.text()),
            fetch("/src/data/roles.csv").then((r) => r.text()),
          ]);

          const parsedActors = parseCSV(actorsText);
          const parsedMovies = parseCSV(moviesText);
          const parsedRoles  = parseCSV(rolesText);

          // Save to localStorage, then finalize state
          localStorage.setItem("actors", JSON.stringify(parsedActors));
          localStorage.setItem("movies", JSON.stringify(parsedMovies));
          localStorage.setItem("roles",  JSON.stringify(parsedRoles));

          finalize(parsedActors, parsedMovies, parsedRoles);
        })();
      }
    } catch {
      // In case of any parse/storage error, just stop loading to avoid spinner lock
      setLoading(false);
    }

    return () => { cancelled = true; };
  }, []);

  const updateActors = (newActors) => {
    setActors(newActors);
    localStorage.setItem("actors", JSON.stringify(newActors));
  };
  const updateMovies = (newMovies) => {
    setMovies(newMovies);
    localStorage.setItem("movies", JSON.stringify(newMovies));
  };
  const updateRoles = (newRoles) => {
    setRoles(newRoles);
    localStorage.setItem("roles", JSON.stringify(newRoles));
  };

  return (
    <DataContext.Provider
      value={{ actors, movies, roles, updateActors, updateMovies, updateRoles, loading }}
    >
      {children}
    </DataContext.Provider>
  );
};
