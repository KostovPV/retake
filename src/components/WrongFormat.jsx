import React from "react";
import "./WrongFormat.css";

export default function WrongFormat({ where }) {
  return (
    <section className="wrongfmt">
      <h3>Unsupported data format</h3>
      {where && <p className="where">Location: <strong>{where}</strong></p>}
      <p className="desc">Your loaded data does not match the expected columns. Please use tab-separated headers exactly as below.</p>

      <div className="example-data">
        <div>
          <h4>Actors</h4>
          <pre>ID\tFullName\tBirthDate</pre>
          <small>Example row: <code>1\tTom Hanks\t1966-12-24</code></small>
        </div>
        <div>
          <h4>Movies</h4>
          <pre>ID\tTitle\tReleaseDate</pre>
          <small>Example row: <code>1\tMovie Title\t10/19/1996</code></small>
        </div>
        <div>
          <h4>Roles</h4>
          <pre>ID\tActorID\tMovieID\tRoleName</pre>
          <small>Example row: <code>1\t5\t1\tDetective</code></small>
        </div>
      </div>

      <p className="tip">Tip: ensure your first line contains the headers and values are separated by a single tab.</p>
    </section>
  );
}

