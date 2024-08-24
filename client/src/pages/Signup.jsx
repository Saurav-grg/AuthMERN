import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      // console.log(data);
      if (data.success === false) {
        setError(true);
        return;
      }
    } catch (error) {}
    setLoading(false);
    setError(true);
  };
  // console.log(formData);
  return (
    <div className="max-w-lg mx-auto p-2">
      <h1 className="text-3xl text-center font-semibold my-7"> sign up</h1>
      {error && (
        <p className="text-red-600 bg-red-100 my-2 px-2 py-1">
          Something went wrong!!!
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 rounded"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="enter email"
          id="email"
          className="bg-slate-100 p-3 rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded hover:opacity-90 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'SIGN UP'}
        </button>
      </form>
      {/* <button className="bg-red-600 text-white p-3 rounded">Google</button> */}
      <div className="flex gap-2">
        <p>Have an account ? </p>
        <Link to="/sign-in">
          <span className="text-blue-600">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
