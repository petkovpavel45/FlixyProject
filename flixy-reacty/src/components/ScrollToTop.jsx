import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 350);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-4 z-[200] bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition-colors"
      title="Back to top"
    >
      <MdKeyboardArrowUp size={24} />
    </button>
  );
};

export default ScrollToTop;
