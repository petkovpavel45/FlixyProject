import { useEffect } from "react";

const IntroAnimation = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="intro-overlay">
      <div className="intro-text-wrap">
        <span className="intro-dark">FLIXY</span>
        <span className="intro-bright">FLIXY</span>
        <div className="intro-line" />
      </div>
    </div>
  );
};

export default IntroAnimation;
