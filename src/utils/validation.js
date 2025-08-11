export const normalize = (s) => (s ?? "").toString().trim();

// DD.MM.YYYY -> MM/DD/YYYY (for localStorage)
export const toStorageDate = (eu) => {
  const [dd, mm, yyyy] = (eu || "").split(".");
  return `${mm}/${dd}/${yyyy}`;
};

// Build sets/maps once, pass to validators
export const buildTitleSet = (movies = []) =>
  new Set(movies.map(m => normalize(m.Title).toLowerCase()));

export const buildNameSet = (actors = []) =>
  new Set(actors.map(a => normalize(a.FullName).toLowerCase()));

export const buildNameMap = (actors = []) => {
  const map = new Map();
  actors.forEach(a => {
    map.set(normalize(a.FullName).toLowerCase(), a.ID);
  });
  return map;
};

// ----- movie title -----
export const getTitleError = (s, existingTitlesSet = new Set()) => {
  const v = normalize(s);
  if (!v) return "Title is required.";
  if (v.length < 4) return "Title must be at least 4 characters.";
  if (!/[A-Za-zА-Яа-я]/.test(v)) return "Title must include at least one letter.";
  if (existingTitlesSet.has(v.toLowerCase())) return "A movie with this title already exists.";
  return "";
};

// ----- dates -----
export const getReleaseDateError = (s) => {
  const v = normalize(s);
  if (!v) return "Release date is required.";

  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(v);
  if (!m) return "Use DD.MM.YYYY (e.g., 07.09.2020).";

  const [, ddStr, mmStr, yyyyStr] = m;
  const dd = Number(ddStr), mm = Number(mmStr), yyyy = Number(yyyyStr);
  if (yyyy < 1900 || yyyy > 2099) return "Year must be between 1900 and 2099.";

  const d = new Date(yyyy, mm - 1, dd);
  const exact = d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd;
  if (!exact) return "Invalid calendar date.";

  const today = new Date(); today.setHours(0,0,0,0);
  if (d > today) return "Release date cannot be in the future.";

  return "";
};

export const getBirthdateError = (s) => {
  const v = normalize(s);
  if (!v) return ""; // optional
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(v);
  if (!m) return "Use DD.MM.YYYY (e.g., 07.09.1980) or leave empty.";

  const [, ddStr, mmStr, yyyyStr] = m;
  const dd = Number(ddStr), mm = Number(mmStr), yyyy = Number(yyyyStr);
  if (yyyy < 1900 || yyyy > 2099) return "Year must be between 1900 and 2099.";

  const d = new Date(yyyy, mm - 1, dd);
  const exact = d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd;
  if (!exact) return "Invalid calendar date.";

  const today = new Date(); today.setHours(0,0,0,0);
  if (d > today) return "Birthdate cannot be in the future.";

  return "";
};

// ----- actor name -----
export const getActorNameError = (s, nameSetOrMap, currentId = null) => {
  const v = normalize(s);
  if (!v) return "Full name is required.";

  // At least two words, each Capitalized
  const NAME_RE = /^[A-Z][a-z]+(?: [A-Z][a-z]+)+$/;
  if (!NAME_RE.test(v)) {
    return 'Enter first and last name, each starting with a capital letter (e.g., "Tom Hanks").';
  }

  // Accept Set (create) or Map name->id (edit)
  if (nameSetOrMap instanceof Map) {
    const ownerId = nameSetOrMap.get(v.toLowerCase());
    if (ownerId && String(ownerId) !== String(currentId)) {
      return "An actor with this name already exists.";
    }
  } else if (nameSetOrMap instanceof Set) {
    if (nameSetOrMap.has(v.toLowerCase())) {
      return "An actor with this name already exists.";
    }
  }
  return "";
};
