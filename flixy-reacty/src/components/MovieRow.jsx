/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import MovieItem from "./MovieItem";
import MovieSkeleton from "./MovieSkeleton";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

const MovieRow = ({ title, url, onMovieClick }) => {
  const rowId = useRef(`row-${Math.random().toString(36).slice(2)}`).current;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(url).then((response) => {
      setMovies(response.data.results);
      setLoading(false);
    });
  }, [url]);

  const slide = (offset) => {
    const slider = document.getElementById(rowId);
    if (slider) slider.scrollLeft += offset;
  };

  return (
    <>
      <h2 className="font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>
      <div className="relative flex items-center group/row">
        <MdChevronLeft
          onClick={() => slide(-500)}
          size={40}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover/row:block cursor-pointer"
        />
        <div
          id={rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => <MovieSkeleton key={i} />)
            : movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} onMovieClick={onMovieClick} />
              ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          size={40}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover/row:block cursor-pointer"
        />
      </div>
    </>
  );
};

export default MovieRow;
