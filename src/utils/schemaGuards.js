const hasKeys = (obj, keys) => obj && typeof obj === "object" && keys.every(k => Object.prototype.hasOwnProperty.call(obj, k));

export const isActorsOk = (list) => {
  if (!Array.isArray(list) || list.length === 0) return false;
  return hasKeys(list[0], ["ID", "FullName", "BirthDate"]);
};

export const isMoviesOk = (list) => {
  if (!Array.isArray(list) || list.length === 0) return false;
  return hasKeys(list[0], ["ID", "Title", "ReleaseDate"]);
};

export const isRolesOk = (list) => {
  if (!Array.isArray(list) || list.length === 0) return false;
  return hasKeys(list[0], ["ID", "ActorID", "MovieID", "RoleName"]);
};

export const isAllOk = ({ actors, movies, roles }) => isActorsOk(actors) && isMoviesOk(movies) && isRolesOk(roles);
