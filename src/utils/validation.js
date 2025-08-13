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

  // Accept DD.MM.YYYY, MM/DD/YYYY, YYYY-MM-DD, and Month DD YYYY
  const eu = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/i.exec(v);
  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/i.exec(v);
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/i.exec(v);

  let dd, mm, yyyy;

  if (eu) {
    [, dd, mm, yyyy] = eu;
  } else if (us) {
    [, mm, dd, yyyy] = us;
  } else if (iso) {
    [, yyyy, mm, dd] = iso;
  } else {
    // Month DD YYYY or DD Month YYYY (with dots or spaces)
    const MONTHS = {
      january:1, jan:1, february:2, feb:2, march:3, mar:3, april:4, apr:4,
      may:5, june:6, jun:6, july:7, jul:7, august:8, aug:8, september:9, sep:9, sept:9,
      october:10, oct:10, november:11, nov:11, december:12, dec:12
    };
    const tokens = v.replace(/[.,]/g, " ").replace(/\s+/g, " ").trim().split(" ");
    if (tokens.length >= 3) {
      const t0 = tokens[0].toLowerCase();
      const t1 = tokens[1].toLowerCase();
      const t2 = tokens[2];
      if (MONTHS[t0] && /^\d{1,2}$/.test(t1) && /^\d{4}$/.test(t2)) {
        dd = t1; mm = MONTHS[t0]; yyyy = t2;
      } else if (/^\d{1,2}$/.test(t0) && MONTHS[t1] && /^\d{4}$/.test(t2)) {
        dd = t0; mm = MONTHS[t1]; yyyy = t2;
      } else {
        return "Use a valid date (e.g., 07.09.2020 or 10/19/1996 or 1996-10-19).";
      }
    } else {
      return "Use a valid date (e.g., 07.09.2020 or 10/19/1996 or 1996-10-19).";
    }
  }

  const d = Number(dd), m = Number(mm), y = Number(yyyy);
  if (y < 1900 || y > 2099) return "Year must be between 1900 and 2099.";

  const dt = new Date(y, m - 1, d);
  const exact = dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
  if (!exact) return "Invalid calendar date.";

  const today = new Date(); today.setHours(0,0,0,0);
  if (dt > today) return "Release date cannot be in the future.";

  return "";
};


export const getBirthdateError = (s) => {
  const v = normalize(s);
  if (!v) return ""; 

  const eu = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(v);
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);

  let dd, mm, yyyy;
  if (eu) {
    [, dd, mm, yyyy] = eu;
  } else if (iso) {
    [, yyyy, mm, dd] = iso;
  } else {
    return 'Use DD.MM.YYYY or YYYY-MM-DD (e.g., "07.09.1980" or "1980-09-07"), or leave empty.';
  }

  const d = Number(dd), m = Number(mm), y = Number(yyyy);
  if (y < 1900 || y > 2099) return "Year must be between 1900 and 2099.";

  const dt = new Date(y, m - 1, d);
  const exact = dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
  if (!exact) return "Invalid calendar date.";

  const today = new Date(); today.setHours(0,0,0,0);
  if (dt > today) return "Birthdate cannot be in the future.";

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
