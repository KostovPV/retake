import { createContext, useEffect, useState } from "react";
import { parseCSV } from "../utils/csvParser";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [actorsText, moviesText, rolesText] = await Promise.all([
        fetch("/src/data/actors.csv").then((r) => r.text()),
        fetch("/src/data/movies.csv").then((r) => r.text()),
        fetch("/src/data/roles.csv").then((r) => r.text()),
      ]);

      setActors(parseCSV(actorsText));
      setMovies(parseCSV(moviesText));
      setRoles(parseCSV(rolesText));
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ actors, movies, roles }}>
      {children}
    </DataContext.Provider>
  );
};
