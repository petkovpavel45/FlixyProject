// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import IntroAnimation from "./components/IntroAnimation";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem("flixy-intro-shown")
  );

  const handleIntroDone = () => {
    sessionStorage.setItem("flixy-intro-shown", "1");
    setShowIntro(false);
  };

  return (
    <AuthContextProvider>
      <ToastProvider>
        {showIntro && <IntroAnimation onDone={handleIntroDone} />}
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ToastProvider>
    </AuthContextProvider>
  );
};

export default App;
