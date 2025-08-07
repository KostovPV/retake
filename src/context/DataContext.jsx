import { createContext, useEffect, useState } from "react";
import { parseCSV } from "../utils/csvParser";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedActors = JSON.parse(localStorage.getItem("actors"));
    const storedMovies = JSON.parse(localStorage.getItem("movies"));
    const storedRoles = JSON.parse(localStorage.getItem("roles"));

    if (storedActors && storedMovies && storedRoles) {
      setActors(storedActors);
      setMovies(storedMovies);
      setRoles(storedRoles);
    } else {
      const loadData = async () => {
        const [actorsText, moviesText, rolesText] = await Promise.all([
          fetch("/src/data/actors.csv").then((r) => r.text()),
          fetch("/src/data/movies.csv").then((r) => r.text()),
          fetch("/src/data/roles.csv").then((r) => r.text()),
        ]);

        const parsedActors = parseCSV(actorsText);
        const parsedMovies = parseCSV(moviesText);
        const parsedRoles = parseCSV(rolesText);

        setActors(parsedActors);
        setMovies(parsedMovies);
        setRoles(parsedRoles);

        // Save to localStorage
        localStorage.setItem("actors", JSON.stringify(parsedActors));
        localStorage.setItem("movies", JSON.stringify(parsedMovies));
        localStorage.setItem("roles", JSON.stringify(parsedRoles));
      };

      loadData();
    }
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
      value={{ actors, movies, roles, updateActors, updateMovies, updateRoles }}
    >
      {children}
    </DataContext.Provider>
  );
};
