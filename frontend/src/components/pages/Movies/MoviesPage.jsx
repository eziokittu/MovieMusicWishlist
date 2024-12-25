import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import ReactPaginate from "react-paginate";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("movie"); // Default type is Movies
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const [loading, setLoading] = useState(false);

  // Fetch movies based on filters
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        keyword: searchQuery,
        page: page.toString(),
        sort_by: sortBy,
        type,
        limit: "10",
      });

      const response = await fetch(`http://127.0.0.1:8000/movies/?${params}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setMovies(data.movies);
      setTotalPages(data.total_pages); // Update total pages dynamically
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all genres
  const fetchGenres = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/genres/`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres(); // Fetch genres on page load
    fetchMovies(); // Fetch movies
  }, [page, searchQuery, sortBy, type]);

  // Handle pagination click
  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="min-h-[700px] w-full bg-gray-100 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">Movies</h1>

      {/* Filters and Search */}
      <div className="w-full max-w-5xl flex flex-wrap gap-4 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search movies or TV shows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-md"
        />
        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="popularity.desc">Popularity (Desc)</option>
          <option value="popularity.asc">Popularity (Asc)</option>
          <option value="release_date.desc">Release Date (Desc)</option>
          <option value="release_date.asc">Release Date (Asc)</option>
          <option value="original_title.asc">Name (Asc)</option>
          <option value="original_title.desc">Name (Desc)</option>
        </select>
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full max-w-5xl">
        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages} // Updated dynamically
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center items-center"}
        pageClassName={"mx-2"}
        activeClassName={"text-blue-500 font-bold"}
        previousClassName={"px-3 py-1"}
        nextClassName={"px-3 py-1"}
      />
    </div>
  );
};

export default MoviesPage;
