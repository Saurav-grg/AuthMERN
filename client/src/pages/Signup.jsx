import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

export default function Signup() {
  // const [formData, setFormData] = useState({});
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate('/verify-email');
    } catch (error) {
      console.log(error);
      // setError(error)
    }
  };
  // console.log(formData);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto my-auto mt-10 w-full bg-gray-400 bg-opacity-50 rounded-2xl shadow-2xl 
			overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create New Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-4 placeholder:text-sm pr-3 py-3 bg-gray-100 bg-opacity-50 rounded-lg border-none "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full pl-4 placeholder:text-sm pr-3 py-3 bg-gray-100 bg-opacity-50 rounded-lg border-none "
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full pl-4 placeholder:text-sm pr-3 py-3 bg-gray-100 bg-opacity-50 rounded-lg border-none "
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          {/* <PasswordStrengthMeter password={password} /> */}

          <motion.button
            className="mt-2 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div class="border-gray-300 size-8 mx-auto animate-spin rounded-full border-4 border-t-blue-600" />
            ) : (
              'Sign Up'
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <Link to={'/login'} className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
