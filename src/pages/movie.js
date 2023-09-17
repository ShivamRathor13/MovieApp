import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import Cards2 from "../components/card2";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id, type } = useParams();

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGYxNWRjNzY1Y2NkZWE4ZDg4NWUwYTJjNmMzZmJmNyIsInN1YiI6IjY1MDJjYTlkZWZlYTdhMDBmZDFjOGU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qJCZPhVnxCU6k4jQwK3egtp2kdo50sydV-ZhqsvB9IM";
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}`;

  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const fetchSimilarMovies = useCallback(() => {
    const similarMoviesUrl = `https://api.themoviedb.org/3/movie/${id}/similar`;
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    fetch(similarMoviesUrl, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setSimilarMovies(data.results.slice(0, 18));
      })
      .catch((error) => {
        console.error("Error fetching similar movies:", error);
      });
  }, [id, apiKey]);

  const getData = useCallback(() => {
    const queryParams = `language=en-US${
      type === "popular"
        ? "&append_to_response=popularity"
        : type === "top_rated"
        ? "&append_to_response=vote_average,vote_count"
        : type === "upcoming"
        ? "&append_to_response=release_date"
        : ""
    }`;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

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
      .then((data) => setMovie(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl, type, apiKey]);

  useEffect(() => {
    const fetchReviews = () => {
      const reviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews`;
      const headers = {
        Authorization: `Bearer ${apiKey}`,
      };

      fetch(reviewsUrl, {
        method: "GET",
        headers: headers,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setReviews(data.results.slice(0, 5));
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    };

    getData();
    fetchReviews();
    fetchSimilarMovies();
  }, [getData, fetchSimilarMovies, id, apiKey]);

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt="img"
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
              alt="img"
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <span key={genre.id} className="movie__genre">
                      {genre.name}
                    </span>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="movie__overview">
              {currentMovieDetail ? currentMovieDetail.overview : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div className="movie__heading2">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          (currentMovieDetail.production_companies.some(
            (company) => company.logo_path
          ) ? (
            currentMovieDetail.production_companies.map(
              (company) =>
                company.logo_path && (
                  <span key={company.id} className="productionCompanyImage">
                    <img
                      className="movie__productionComapany"
                      style={{ background: "white" }}
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        company.logo_path
                      }
                      alt={company.name}
                    />
                    <span>{company.name}</span>
                  </span>
                )
            )
          ) : (
            <ul>
              {currentMovieDetail.production_companies.map((company) => (
                <li key={company.id} className="productionCompanyName">
                  {company.name}
                </li>
              ))}
            </ul>
          ))}
      </div>

      {/* Reviews Section */}
      <div className="movie__reviews">
        <h2 className="movie__heading2">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="movie__review">
              <div className="movie__reviewAuthor">
                {review.author_details.name || "Anonymous"}
              </div>
              <div className="movie__reviewAvatar">
                {review.author_details.avatar_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
                    alt="fas fa-star"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="#555"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                  </svg>
                )}
              </div>
              <div className="movie__reviewContent">{review.content}</div>
              <div className="movie__reviewCreatedAt">
                Created at: {review.created_at}
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              color: "#555",
              fontSize: "20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            No reviews available.
          </p>
        )}
      </div>

      <div className="movie__similar">
        <h2 className="movie__heading2">Similar Movies</h2>
        <div className="movie__similarMovies">
          {similarMovies.map((movie) => (
            <Cards2 key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
