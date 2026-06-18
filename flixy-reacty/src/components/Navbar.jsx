/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { MdSearch, MdClose, MdMenu } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {}
    setMenuOpen(false);
  };

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    closeSearch();
    setMenuOpen(false);
  };

  return (
    <>
      {/* Main navbar */}
      <div className="absolute w-full p-4 flex items-center justify-between z-50">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <h1 className="uppercase text-red-600 font-nsans-bold cursor-pointer text-5xl">
            flixy
          </h1>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center bg-black/80 border border-gray-500 rounded px-2">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Titles, genres..."
                className="bg-transparent text-white text-sm py-1.5 px-2 outline-none w-40 md:w-60"
              />
              <button type="button" onClick={closeSearch} className="text-gray-400 hover:text-white ml-1">
                <MdClose size={20} />
              </button>
            </form>
          ) : (
            <button onClick={openSearch} className="text-white hover:text-gray-300">
              <MdSearch size={26} />
            </button>
          )}

          {user?.email ? (
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <button className="capitalize pr-2">profile</button>
              </Link>
              <button onClick={handleLogout} className="capitalize bg-red-600 px-4 py-2 rounded cursor-pointer">
                logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login"><button className="capitalize pr-2">login</button></Link>
              <Link to="/signup">
                <button className="capitalize bg-red-600 px-4 py-2 rounded cursor-pointer">sign up</button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile: search icon + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={openSearch} className="text-white">
            <MdSearch size={26} />
          </button>
          <button onClick={() => setMenuOpen(true)} className="text-white">
            <MdMenu size={30} />
          </button>
        </div>
      </div>

      {/* Mobile search bar (full width, below navbar) */}
      {searchOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full z-50 px-4">
          <form onSubmit={handleSearch} className="flex items-center bg-gray-900 border border-gray-600 rounded px-3 py-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="bg-transparent text-white text-sm outline-none flex-1"
            />
            <button type="button" onClick={closeSearch} className="text-gray-400 hover:text-white ml-2">
              <MdClose size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-black/97 flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <MdClose size={32} />
          </button>

          <Link to="/" onClick={() => setMenuOpen(false)}>
            <h1 className="uppercase text-red-600 font-nsans-bold text-6xl">flixy</h1>
          </Link>

          <div className="flex flex-col items-center gap-5 text-xl">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-red-400 transition-colors">
              Home
            </Link>
            {user?.email && (
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-red-400 transition-colors">
                Profile
              </Link>
            )}
            {!user?.email ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-red-400 transition-colors">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <button className="bg-red-600 px-8 py-3 rounded-lg font-nsans-bold">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="bg-red-600 px-8 py-3 rounded-lg font-nsans-bold">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
