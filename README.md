## Movie App
Overview
Movie Movie Appr is a React-based web application for managing actors, movies, and roles, and analyzing co-appearances of actor pairs. The app parses CSV files, validates data, and displays insights such as the most frequent co-star pair and their shared movies.


Key Features
Data Management
Import actors, movies, and roles from CSV files (tab-separated).

Local storage persistence for all changes.

Add, edit, and delete actors, movies, and roles directly in the UI.

Validation
Input validation for names, dates, and duplicates.

Custom error messages for incorrect formats.

Analysis
Displays the top co-star pair based on shared movie appearances.

Clickable shared movie list opens a modal with movie details and related roles.

Accessibility
Readable error messages for wrong data formats.

Empty state messages when no data is available.

Getting Started
Get a copy of the project up and running on your local machine for development and testing purposes.

Clone the repository

bash
Copy
Edit
git clone <your-repo-url>
Install dependencies

bash
Copy
Edit
npm install
Run the app locally

bash
Copy
Edit
npm run dev
Build for production

bash
Copy
Edit
npm run build
Tech Stack
React – Dynamic and responsive front-end interface.

LocalStorage – Persistent client-side data storage.

CSV Parsing – Custom CSV parser for importing data.

Screenshots
Home Page


Movies page

Actors Page