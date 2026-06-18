import { useState } from "react";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import GenreGrid from "../components/GenreGrid";
import MovieModal from "../components/MovieModal";
import endpoints from "../services/movieServices";

const GENRES = [
  { label: "All",       key: "all" },
  { label: "Trending",  key: "trending",  url: endpoints.trending },
  { label: "Action",    key: "action",    url: endpoints.action },
  { label: "Comedy",    key: "comedy",    url: endpoints.comedy },
  { label: "Horror",    key: "horror",    url: endpoints.horror },
  { label: "Top Rated", key: "topRated",  url: endpoints.topRated },
  { label: "Upcoming",  key: "upcoming",  url: endpoints.upcoming },
];

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeGenre, setActiveGenre] = useState("all");

  const active = GENRES.find((g) => g.key === activeGenre);

  return (
    <>
      <Hero onMovieClick={setSelectedMovie} />

      {/* Genre filter pills */}
      <div className="flex gap-2 px-4 py-4 overflow-x-auto scrollbar-hide">
        {GENRES.map((g) => (
          <button
            key={g.key}
            onClick={() => setActiveGenre(g.key)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors font-nsans-bold
              ${activeGenre === g.key
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {activeGenre === "all" ? (
        <>
          <MovieRow title="Trending Today" url={endpoints.trending}  onMovieClick={setSelectedMovie} />
          <MovieRow title="Popular"        url={endpoints.popular}   onMovieClick={setSelectedMovie} />
          <MovieRow title="Top Rated"      url={endpoints.topRated}  onMovieClick={setSelectedMovie} />
          <MovieRow title="Action"         url={endpoints.action}    onMovieClick={setSelectedMovie} />
          <MovieRow title="Comedy"         url={endpoints.comedy}    onMovieClick={setSelectedMovie} />
          <MovieRow title="Horror"         url={endpoints.horror}    onMovieClick={setSelectedMovie} />
          <MovieRow title="Upcoming"       url={endpoints.upcoming}  onMovieClick={setSelectedMovie} />
        </>
      ) : (
        <GenreGrid url={active.url} onMovieClick={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
};

export default Home;
