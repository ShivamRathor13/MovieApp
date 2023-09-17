import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../App.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="cards1" style={{ marginLeft: "60px" }}>
      <div>
        {isLoading ? (
          <div className="">
            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height={300} duration={2} />
            </SkeletonTheme>
          </div>
        ) : (
          <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="cards2">
              <div>
                <img
                  className="cards__img2"
                  src={`https://image.tmdb.org/t/p/original${
                    movie ? movie.poster_path : ""
                  }`}
                  alt="img"
                />
              </div>
              <div className="cards__overlay2">
                <div className="card__title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="card__runtime">
                  {movie ? movie.release_date : ""}
                  <span className="card__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />
                  </span>
                </div>
                <div className="card__description">
                  {movie ? movie.overview.slice(0, 300) + "..." : ""}
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cards;
