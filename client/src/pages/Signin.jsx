import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signin() {
  const [formData, setFormData] = useState({});
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch('/api/auth/sign-up', {
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };
  // console.log(formData);
  return (
    <div className="max-w-lg mx-auto p-2">
      <h1 className="text-3xl text-center font-semibold my-7"> Log in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 rounded"
          onChange={handleChange}
        />
        {/* <input
          type="email"
          placeholder="enter email"
          id="email"
          className="bg-slate-100 p-3 rounded"
          onChange={handleChange}
        /> */}
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded"
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-3 text-white rounded hover:opacity-90 disabled:opacity-80">
          LOGIN
        </button>
      </form>
      <div className="flex gap-2">
        <p>Dont have an account ? </p>
        <Link to="/sign-up">
          <span className="text-blue-600">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
