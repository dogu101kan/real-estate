import { useCallback, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const search = useRef(null);

  const setFocus = useCallback(() => {
    search.current.focus();
  });

  return (
    <header className="bg-[color:var(--background-primary)] shadow-[color:var(--box-shadow)]">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-2xl sm:text-4xl flex">
            <span className="text-[color:var(--color-primary)]">D.</span>
            <span className="text-[color:var(--color-secondary)]">Emlak</span>
          </h1>
        </Link>
        <form className="border p-3 rounded-3xl mt-2 sm:mt-auto border-transparent focus-within:border-[color:var(--background-secondary)]  transition-colors">
          <label className="flex items-center gap-2 px-2">
            <input
              ref={search}
              type="text"
              placeholder="Ara..."
              className="bg-transparent outline-none w-full sm:w-64 h-4 md:h-auto"
            />
            <FaSearch className="text-[color:var(--color-base)]" />
          </label>
        </form>
        <ul className="flex gap-11 mt-2.5 sm:gap-8 sm:mt-0">
          <Link to="/">
            <li className=" sm:inline hover:text-[color:var(--color-base-secondary)]">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" sm:inline hover:text-[color:var(--color-secondary)]">
              About
            </li>
          </Link>
          <Link to="/login">
            <li className="flex hover:text-[color:var(--color-secondary)]">
              Login
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
