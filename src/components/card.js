import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../App.css";
import { Link } from "react-router-dom";

const Cards = ({ movie, type, cardType, all }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={320} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          {/* <div className={`cards&& ${cardType}`}> */}
          <div className="cards">
            <img
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`}
              alt="img"
            />
            <div className="cards__overlay">
              <div className="card__title" style={{ textAlign: "center" }}>
                {movie ? movie.original_title : ""}
              </div>
              <div className="card__runtime">
                {type === "popular" ? (
                  <div className="card-popularity">
                    <div>Popularity: {movie.popularity}</div>
                    <span className="card__rating">
                      {movie ? movie.vote_average : ""}
                      <i className="fas fa-star" />
                    </span>
                  </div>
                ) : type === "top_rated" ? (
                  <span>
                    Rating: {movie.vote_average} (Total {movie.vote_count}{" "}
                    votes)
                  </span>
                ) : type === "upcoming" ? (
                  <div className="card-popularity">
                    <span>Release on: {movie.release_date}</span>
                    <div className="card__rating">
                      {movie ? movie.vote_average : ""}
                      <i className="fas fa-star" />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
