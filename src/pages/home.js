import React, { useEffect, useState, useCallback, useMemo } from "react";
import "../App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Cards from "../components/card";
import Card2 from "../components/card2";

const Home = () => {
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGYxNWRjNzY1Y2NkZWE4ZDg4NWUwYTJjNmMzZmJmNyIsInN1YiI6IjY1MDJjYTlkZWZlYTdhMDBmZDFjOGU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qJCZPhVnxCU6k4jQwK3egtp2kdo50sydV-ZhqsvB9IM";
  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${apiKey}`,
    };
  }, [apiKey]);

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 18;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const fetchMovies = useCallback(
    (apiUrl) => {
      fetch(apiUrl, {
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
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    [headers]
  );

  useEffect(() => {
    const apiUrl = "https://api.themoviedb.org/3/movie/popular";
    fetchMovies(apiUrl);
  }, [fetchMovies]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
    fetch(searchUrl, {
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
        setSearchResults(data.results);
        setShowSearchResults(true);
      })
      .catch((error) => {
        console.error("Error searching for movies:", error);
      });
  };
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalMovies = movies.length;
  const maxTotalPages = 1001;
  let totalPages = Math.ceil(totalMovies / moviesPerPage);

  if (totalPages > maxTotalPages) {
    totalPages = maxTotalPages;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleResultClick = () => {
    setShowSearchResults(false);
  };

  return (
    <>
      <div className="poster">
        <form
          className="d-flex"
          onSubmit={(e) => e.preventDefault()}
          style={{ marginBottom: "10px" }}
        >
          <input
            className="form-control me-4"
            type="search"
            placeholder="Search movie name"
            aria-label="Search"
            style={{
              backgroundColor: "black",
              border: "1px solid white",
              color: "#fff",
              marginLeft: "10px",
            }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="btn btn-outline"
            type="button"
            style={{
              marginRight: "10px",
              border: "2px solid purple",
              color: "#fff",
            }}
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </form>
        {showSearchResults ? (
          <div className="search-results">
            {searchResults.map((movie) => (
              <Card2
                key={movie.id}
                movie={movie}
                onClick={() => {
                  handleResultClick();
                }}
              />
            ))}
          </div>
        ) : (
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
          >
            {currentMovies.map((movie) => (
              <Link
                key={movie.id}
                style={{ textDecoration: "none", color: "white" }}
                to={`/movie/${movie.id}`}
              >
                <div className="posterImage">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt="img"
                  />
                </div>
                <div className="posterImage__overlay">
                  <div className="posterImage__title">
                    {movie.original_title}
                  </div>
                  <div className="posterImage__runtime">
                    {movie.release_date}
                    <span className="posterImage__rating">
                      {movie.vote_average}
                      <i className="fas fa-star" />
                    </span>
                  </div>
                  <div className="posterImage__description">
                    {movie.overview}
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        )}

        <div className="movie__list">
          <h2 className="list__title">ALL MOVIES</h2>
          <div className="list__cards">
            {currentMovies.map((movie) => (
              <Cards
                key={movie.id}
                movie={movie}
                type="all"
                cardType="all-card"
              />
            ))}
          </div>
          <div className=" paginations">
            <ul className="pagination">
              <li className="page-items page-items">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`page-link ${currentPage === 1 ? "disabled" : ""}`}
                >
                  &laquo;Prev
                </button>
              </li>
              {Array.from({
                length: totalPages,
              }).map(
                (_, index) =>
                  (index === currentPage - 1 ||
                    index === currentPage ||
                    index === currentPage + 1) && (
                    <li key={index} className="page-item">
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`page-link ${
                          index + 1 === currentPage ? "active" : ""
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
              )}
              <li className="page-item">
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`page-link ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  Next &raquo;
                </button>
              </li>
            </ul>
          </div>
          <div style={{ textAlign: "center" }}>
            <p className="pagination-info">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
