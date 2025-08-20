import { NavLink } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from 'react-redux';
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const products = useSelector(state => state.cart.cartItems)

  return (
    <header className="w-full shadow-md bg-white">
      {/* Top row: Logo, Search, Cart, User */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-3xl font-bold text-slate-900 hover:text-amber-600 transition-colors duration-200"
        >
          Luxe
        </NavLink>

        {/* Search bar */}
        <form className="flex items-center border border-slate-300 rounded-full px-3 py-1 flex-grow max-w-xl bg-white order-3 md:order-none w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Products"
            className="outline-none px-2 py-1 text-sm text-slate-700 flex-grow"
          />
          <FaSearch className="text-slate-500 hover:text-orange-500 transition" />
        </form>

        {/* Icons */}
        <div className="flex items-center space-x-4 text-slate-600 text-xl">
          <NavLink to="/cart" className=" relative hover:text-orange-500 transition">
            <FaShoppingCart className="text-2xl" />
            {products.length > 0 && (
              <span className="absolute -top-2   text-xs w-3 left-3 bg-red-600 rounded-full flex justify-center items-center text-white">
                {products.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/userProfile" className="hover:text-orange-500 transition">
            <FaUser />
          </NavLink>

          {/* Buttons */}
          <NavLink
            to="/login"
            className="px-4 py-1 rounded-full border border-slate-300 text-sm hover:bg-orange-500 hover:text-white transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-1 rounded-full border border-slate-300 text-sm hover:bg-orange-500 hover:text-white transition"
          >
            Register
          </NavLink>


          {/* Mobile menu button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Bottom row: Desktop nav */}
      <nav className="hidden md:flex justify-center space-x-8 py-3 border-t border-slate-200 text-slate-700 font-medium">
        <NavLink to="/" className="hover:text-orange-500">Home</NavLink>
        <NavLink to="/products" className="hover:text-orange-500">Products</NavLink>
        <NavLink to="/about" className="hover:text-orange-500">About</NavLink>
        <NavLink to="/contact" className="hover:text-orange-500">Contact</NavLink>
      </nav>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-3 py-4 border-t border-slate-200 text-slate-700 font-medium">
          <NavLink to="/" className="hover:text-orange-500">Home</NavLink>
          <NavLink to="/products" className="hover:text-orange-500">Products</NavLink>
          <NavLink to="/about" className="hover:text-orange-500">About</NavLink>
          <NavLink to="/contact" className="hover:text-orange-500">Contact</NavLink>
          <NavLink to="/login" className="hover:text-orange-500">Login</NavLink>
          <NavLink to="/register" className="hover:text-orange-500">Register</NavLink>
        </div>
      )}
    </header>
  );
};

export default NavBar;
