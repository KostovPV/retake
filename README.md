# Movie App
<<<<<<< HEAD
=======
## Overview
Movie Movie Appr is a React-based web application for managing actors, movies, and roles, and analyzing co-appearances of actor pairs. The app parses CSV files, validates data, and displays insights such as the most frequent co-star pair and their shared movies.
>>>>>>> 6f1b95d6eef62f9f9f65f5f32698d921f16a1150

## Overview
Movie App is a React-based web application for managing actors, movies, and roles, and analyzing co-appearances of actor pairs.  
The app parses CSV files, validates data, and displays insights such as the most frequent co-star pair and their shared movies.

<<<<<<< HEAD
---
=======
Key Features
### Data Management
Import actors, movies, and roles from CSV files (tab-separated).
>>>>>>> 6f1b95d6eef62f9f9f65f5f32698d921f16a1150

## Key Features

### **Data Management**
- Import actors, movies, and roles from **tab-separated CSV files**.
- **LocalStorage** persistence for all data changes.
- Add, edit, and delete actors, movies, and roles directly in the UI.
- **Edit & Delete functionality**:
  - **Movies**: Update movie title or release date directly from the movie modal, or delete the movie entirely.
  - **Actors**: Update actor name or birthdate from the actor modal, or delete the actor entirely.
  - Changes instantly update the analysis and saved data in LocalStorage.

<<<<<<< HEAD
---
=======
### Validation
Input validation for names, dates, and duplicates.
>>>>>>> 6f1b95d6eef62f9f9f65f5f32698d921f16a1150

### **Validation**
- Input validation for names, dates, and duplicates.
- Custom error messages for incorrect formats.
- Supports multiple date formats when importing CSV files.

<<<<<<< HEAD
---
=======
### Analysis
Displays the top co-star pair based on shared movie appearances.
>>>>>>> 6f1b95d6eef62f9f9f65f5f32698d921f16a1150

### **Analysis**
- Displays the **top co-star pair** based on shared movie appearances.
- Clickable shared movie list opens a modal with movie details and related roles.
- Movies in the analysis view can be opened without navigating away from the page.

<<<<<<< HEAD
---
=======
### Accessibility
Readable error messages for wrong data formats.
>>>>>>> 6f1b95d6eef62f9f9f65f5f32698d921f16a1150

### **Accessibility**
- Clear error messages for wrong data formats.
- Empty state messages when no data is available.

---

## Getting Started

Get a copy of the project up and running on your local machine for development and testing purposes.

1. **Clone the repository**
```bash
git clone <your-repo-url>
```

2. **Install dependencies**
```
npm install
```

3. **Run app localy**
```
npm irun dev
```

<<<<<<< HEAD
### Tech Stack
React – Component-based UI
=======
bash
Copy
Edit
npm run build
>>>>>>> 6f1b95d6eef62f9f9f65f5f32698d921f16a1150

LocalStorage – Persistent client-side data storage

<<<<<<< HEAD
Custom CSV Parser – Handles importing and validation of tab-separated data

### Screenshots
Home Page
<img width="1920" height="945" alt="Home Page" src="https://github.com/user-attachments/assets/d76dd8ca-c8b9-49b2-a7e1-1cee736028a7" />
Movies Page
<img width="1920" height="1019" alt="Movie Page" src="https://github.com/user-attachments/assets/05e55373-c0be-469f-9940-0e851a8a91ed" />
Actors Page
<img width="1920" height="1019" alt="Actor Page" src="https://github.com/user-attachments/assets/192383d9-2249-47a8-9fd9-c4e77c0cb761" />
=======
CSV Parsing – Custom CSV parser for importing data

#### Screenshots

## Home Page
<img width="1920" height="945" alt="Home Page" src="https://github.com/user-attachments/assets/d76dd8ca-c8b9-49b2-a7e1-1cee736028a7" />




## Movies page
<img width="1920" height="1019" alt="Movie Page" src="https://github.com/user-attachments/assets/05e55373-c0be-469f-9940-0e851a8a91ed" />





Actors Page

<img width="1920" height="1019" alt="Actor Page" src="https://github.com/user-attachments/assets/192383d9-2249-47a8-9fd9-c4e77c0cb761" />





>>>>>>> 6f1b95d6eef62f9f9f65f5f32698d921f16a1150
