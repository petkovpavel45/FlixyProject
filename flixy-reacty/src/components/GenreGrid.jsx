/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { createImageUrl } from "../services/movieServices";
import MovieSkeleton from "./MovieSkeleton";

const GenreGrid = ({ url, onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(url).then((res) => {
      setMovies(res.data.results.filter((m) => m.backdrop_path || m.poster_path));
      setLoading(false);
    });
  }, [url]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-4 py-4">
      {loading
        ? Array(12).fill(0).map((_, i) => (
            <div key={i} className="w-full h-36 bg-gray-800 rounded-lg animate-pulse" />
          ))
        : movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              className="cursor-pointer rounded-lg overflow-hidden group/card relative"
            >
              <img
                className="w-full h-36 object-cover object-top transition-transform duration-300 group-hover/card:scale-105"
                src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")}
                alt={movie.title}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-2xl text-white">▶</span>
              </div>
              <div className="mt-1 px-0.5">
                <p className="text-xs font-nsans-bold text-gray-200 truncate">{movie.title}</p>
                {movie.vote_average > 0 && (
                  <p className="text-[10px] text-yellow-400">★ {movie.vote_average.toFixed(1)}</p>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default GenreGrid;
