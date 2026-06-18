import flixybg from "../assets/flixybg.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src={flixybg}
        alt="flixy background"
      />
      <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />
      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-nsans-bold">Login</h1>
            {error && (
              <p className="text-red-500 text-sm mt-3 bg-red-500/10 px-3 py-2 rounded">
                {error}
              </p>
            )}
            <form onSubmit={handleFormSubmit} className="w-full flex flex-col py-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                autoComplete="email"
                className="p-3 my-2 bg-gray-700 rounded"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                className="p-3 my-2 bg-gray-700 rounded"
                required
              />
              <button
                disabled={loading}
                className="bg-red-600 py-3 my-6 rounded font-nsans-bold disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="my-4">
                <span className="text-gray-600 mr-2">New to Flixy?</span>
                <Link to="/signup" className="text-white hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
