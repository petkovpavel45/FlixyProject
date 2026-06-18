/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { createImageUrl, getVideosUrl, getCreditsUrl, getDetailsUrl } from "../services/movieServices";
import { arrayUnion, arrayRemove, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { UserAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const MovieModal = ({ movie, onClose }) => {
  const [trailer, setTrailer] = useState(null);
  const [liked, setLiked] = useState(false);
  const [cast, setCast] = useState([]);
  const [details, setDetails] = useState(null);
  const { user } = UserAuth();
  const { addToast } = useToast();

  useEffect(() => {
    axios.get(getVideosUrl(movie.id)).then((res) => {
      const yt = res.data.results.find(
        (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
      );
      if (yt) setTrailer(yt.key);
    });
    axios.get(getCreditsUrl(movie.id)).then((res) => {
      setCast(res.data.cast.slice(0, 7));
    });
    axios.get(getDetailsUrl(movie.id)).then((res) => {
      setDetails(res.data);
    });
  }, [movie.id]);

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

  const toggleFav = async () => {
    if (!user?.email) {
      addToast("Please log in to save movies", "info");
      return;
    }
    const userDoc = doc(db, "users", user.email);
    if (liked) {
      await updateDoc(userDoc, { favShows: arrayRemove(movie) });
      addToast("Removed from favourites", "info");
    } else {
      await setDoc(userDoc, { favShows: arrayUnion({ ...movie }) }, { merge: true });
      addToast("Added to favourites ❤️", "success");
    }
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const { title, overview, release_date, vote_average, backdrop_path, poster_path } = movie;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 rounded-xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/60 rounded-full p-1 hover:bg-black"
        >
          <AiOutlineClose size={22} />
        </button>

        {/* Trailer or Backdrop */}
        {trailer ? (
          <div className="relative w-full aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <img
            className="w-full h-[260px] object-cover object-top"
            src={createImageUrl(backdrop_path ?? poster_path, "w780")}
            alt={title}
          />
        )}

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-nsans-bold leading-tight">{title}</h2>
              {details?.tagline && (
                <p className="text-gray-500 text-sm italic mt-0.5">{details.tagline}</p>
              )}
            </div>
            <button
              onClick={toggleFav}
              className="flex-shrink-0 mt-1"
              title={liked ? "Remove from favourites" : "Add to favourites"}
            >
              {liked ? (
                <FaHeart size={26} className="text-red-500" />
              ) : (
                <FaRegHeart size={26} className="text-gray-300 hover:text-red-400" />
              )}
            </button>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-400">
            {release_date && <span>{release_date.slice(0, 4)}</span>}
            {details?.runtime > 0 && <span>{details.runtime} min</span>}
            {vote_average > 0 && (
              <span className="text-yellow-400 font-nsans-bold">★ {vote_average.toFixed(1)}</span>
            )}
            {!trailer && <span className="text-gray-600 italic">No trailer</span>}
          </div>

          {/* Genres */}
          {details?.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {details.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-0.5 rounded-full bg-gray-700 text-gray-300 text-xs"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {overview && (
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">{overview}</p>
          )}

          {/* Cast */}
          {cast.length > 0 && (
            <div className="mt-5">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Cast</p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {cast.map((actor) => (
                  <div key={actor.id} className="flex-shrink-0 text-center w-16">
                    {actor.profile_path ? (
                      <img
                        className="w-14 h-14 rounded-full object-cover mx-auto"
                        src={createImageUrl(actor.profile_path, "w185")}
                        alt={actor.name}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mx-auto text-lg font-nsans-bold text-gray-400">
                        {actor.name.charAt(0)}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1 truncate">{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
