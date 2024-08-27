import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
export default function Header() {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    // { name: 'login', path: '/login' },
    // { name: 'Sign Up', path: '/sign-up' },
  ];
  const { isAuthenticated, user, logout } = useAuthStore();
  // console.log(user);
  const handleLogout = async () => {
    await logout();
  };
  return (
    <nav className="flex font-bold md:justify-around justify-between px-2  bg-gray-200 py-4">
      <div className="text-2xl">Auth</div>
      <div>
        {pages.map((page, index) => (
          <NavLink
            key={index}
            className={({ isActive }) => {
              return (
                ' text-blue-900  md:mx-4 mx-2 md:my-0' +
                (!isActive
                  ? 'bg-white '
                  : 'bg-black underline underline-offset-8 ')
              );
            }}
            to={page.path}
          >
            {page.name}
          </NavLink>
        ))}
      </div>
      {isAuthenticated && user.isVerified ? (
        <div className="flex gap-4 items-center">
          <div>{user.username}</div>
          <button
            onClick={handleLogout}
            className="border-2 border-red-400 px-2 text-red-400 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="border-green-500 border-2 px-2 text-green-400 font-semibold rounded bg-white">
              Login
            </button>
          </Link>

          <Link to="/sign-up">
            <button className="border-green-500 border-2 px-2 text-green-400 font-semibold rounded bg-white">
              Signup
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
