import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword, isSubmitted } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    // setIsSubmitted(true);
  };
  // console.log(email);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-400 mx-auto mt-10 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-black text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <input
              className="w-full pl-4 placeholder:text-sm pr-3 py-3 bg-gray-100 bg-opacity-50 rounded-lg border-none "
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
            >
              {isLoading ? (
                <div class="border-gray-300 size-8 mx-auto animate-spin rounded-full border-4 border-t-blue-600" />
              ) : (
                'Send Reset Link'
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-16 h-16 text-white bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              {/* <Mail className='h-8 w-8 text-white' /> */}Mail
            </motion.div>
            <p className="text-black mb-6">
              If an account exists for your email, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <Link
          to={'/login'}
          className="text-sm text-white hover:underline flex items-center"
        >
          <p className=""> &#x2190;</p>
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
};
export default ForgotPasswordPage;
