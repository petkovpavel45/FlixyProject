import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { getSearchUrl, createImageUrl } from "../services/movieServices";
import MovieModal from "../components/MovieModal";

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!q) return;
    setMovies([]);
    setPage(1);
    setLoading(true);
    axios.get(getSearchUrl(q, 1)).then((res) => {
      setMovies(res.data.results.filter((m) => m.backdrop_path || m.poster_path));
      setTotalPages(res.data.total_pages);
      setLoading(false);
    });
  }, [q]);

  const loadMore = () => {
    const next = page + 1;
    setLoading(true);
    axios.get(getSearchUrl(q, next)).then((res) => {
      setMovies((prev) => [
        ...prev,
        ...res.data.results.filter((m) => m.backdrop_path || m.poster_path),
      ]);
      setPage(next);
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8">
      <h2 className="text-xl font-nsans-bold mb-6">
        Results for:{" "}
        <span className="text-red-500">"{q}"</span>
      </h2>

      {!loading && movies.length === 0 && (
        <p className="text-gray-400">No movies found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="cursor-pointer rounded-lg overflow-hidden group relative"
          >
            <img
              className="w-full h-36 object-cover object-top transition-transform duration-300 group-hover:scale-105"
              src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")}
              alt={movie.title}
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <p className="text-xs font-nsans-bold line-clamp-2">{movie.title}</p>
            </div>
          </div>
        ))}

        {loading &&
          Array(12)
            .fill(0)
            .map((_, i) => (
              <div
                key={`sk-${i}`}
                className="w-full h-36 bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
      </div>

      {!loading && page < totalPages && (
        <div className="flex justify-center mt-8 mb-12">
          <button
            onClick={loadMore}
            className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded font-nsans-bold transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default Search;
