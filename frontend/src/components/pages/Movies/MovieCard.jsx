import React, { useState } from "react";
import PopularityRating from "../../reusable/PopularityRating";

const MovieCard = ({ movie, genres }) => {
  const [showModal, setShowModal] = useState(false);

  const movieGenres = movie.genre_ids
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-start">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="w-full h-auto mb-4 rounded-md"
      />
      <h3 className="font-bold text-lg mb-2">{movie.title || movie.name}</h3>
      {/* <PopularityRating score={movie.popularity} /> */}
      <p className="text-sm text-gray-600 mb-2">Genres: {movieGenres.join(", ")}</p>
      <div className="flex gap-2">
        <button
          onClick={() => console.log("Add to List - ID:", movie.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add to List
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
        >
          More Info
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{movie.title || movie.name}</h2>
            <p><strong>Release Date:</strong> {movie.release_date || "N/A"}</p>
            <p><strong>Popularity:</strong> {movie.popularity}</p>
            <p><strong>Genres:</strong> {movieGenres.join(", ")}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
