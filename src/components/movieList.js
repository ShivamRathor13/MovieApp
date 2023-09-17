import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import Cards from "./card";

const MovieList = ({ ptype }) => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGYxNWRjNzY1Y2NkZWE4ZDg4NWUwYTJjNmMzZmJmNyIsInN1YiI6IjY1MDJjYTlkZWZlYTdhMDBmZDFjOGU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qJCZPhVnxCU6k4jQwK3egtp2kdo50sydV-ZhqsvB9IM";
  const apiUrl = `https://api.themoviedb.org/3/movie/${
    type ? type : "popular"
  }`;

  const getData = useCallback(() => {
    let queryParams = "language=en-US";
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    if (type === "popular") {
      queryParams += "&append_to_response=popularity";
    } else if (type === "top_rated") {
      queryParams += "&append_to_response=vote_average,vote_count";
    } else if (type === "upcoming") {
      queryParams += "&append_to_response=release_date";
    }

    fetch(`${apiUrl}?${queryParams}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setMovieList(data.results))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [type, apiUrl, apiKey]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="movie__list">
      <h2 className="list__title">
        {(type ? type : "POPULAR").toUpperCase()} MOVIES
      </h2>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Cards
            key={movie.id}
            movie={movie}
            type={type}
            cardType={
              type === "popular"
                ? "popular-card"
                : type === "top_rated"
                ? "top-rated-card"
                : "upcoming-card"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
