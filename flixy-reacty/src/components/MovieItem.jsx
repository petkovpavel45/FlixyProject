/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createImageUrl } from "../services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, arrayRemove, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { UserAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const MovieItem = ({ movie, onMovieClick }) => {
  const [liked, setLiked] = useState(false);
  const { title, backdrop_path, poster_path } = movie;
  const { user } = UserAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (!user?.email) return;
    const unsub = onSnapshot(doc(db, "users", user.email), (snap) => {
      if (snap.data()) {
        const favs = snap.data().favShows || [];
        setLiked(favs.some((f) => f.id === movie.id));
      }
    });
    return () => unsub();
  }, [user?.email, movie.id]);

  const toggleFav = async (e) => {
    e.stopPropagation();
    if (!user?.email) {
      addToast("Please log in to save movies", "info");
      return;
    }
    const userDoc = doc(db, "users", user.email);
    if (liked) {
      await updateDoc(userDoc, { favShows: arrayRemove(movie) });
    } else {
      await setDoc(userDoc, { favShows: arrayUnion({ ...movie }) }, { merge: true });
    }
  };

  return (
    <div
      className="w-[160px] sm:w-[200px] md:w-[240px] inline-block cursor-pointer m-2 group/card align-top"
      onClick={() => onMovieClick(movie)}
    >
      {/* Image + hover overlay */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          className="w-full h-40 block object-cover object-top transition-transform duration-300 group-hover/card:scale-105"
          src={createImageUrl(backdrop_path ?? poster_path, "w500")}
          alt={title}
        />
        {/* Heart — always visible */}
        <button
          onClick={toggleFav}
          className="absolute top-2 left-2 z-10 drop-shadow cursor-pointer"
        >
          {liked ? (
            <FaHeart size={18} className="text-red-500" />
          ) : (
            <FaRegHeart size={18} className="text-white hover:text-red-400" />
          )}
        </button>
        {/* Play icon on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-3xl text-white drop-shadow-lg">▶</span>
        </div>
      </div>
      {/* Title + rating — always visible below image */}
      <div className="mt-1.5 px-0.5">
        <p className="whitespace-normal text-xs font-nsans-bold text-gray-200 truncate">{title}</p>
        {movie.vote_average > 0 && (
          <p className="text-[10px] text-yellow-400 mt-0.5">★ {movie.vote_average.toFixed(1)}</p>
        )}
      </div>
    </div>
  );
};

export default MovieItem;
