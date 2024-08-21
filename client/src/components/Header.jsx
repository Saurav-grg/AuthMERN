import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Header() {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Sign In', path: '/sign-in' },
  ];
  return (
    <nav className="flex my-1 font-bold justify-around bg-gray-200 py-2">
      <div className="text-2xl">Auth</div>
      <div>
        {pages.map((page, index) => (
          <NavLink
            key={index}
            className={({ isActive }) => {
              return (
                ' text-blue-900  md:mx-4 md:my-0' +
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
    </nav>
  );
}
