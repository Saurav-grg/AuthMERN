import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
// import { app } from '../firebase';
// import { googleAuth, error, isLoading } from '../store/authStore';
import { useAuthStore } from '../store/authStore';
export default function Oauth() {
  const navigate = useNavigate();
  const { googleAuth, error, isLoading } = useAuthStore();
  const handleGoogleClick = async () => {
    await googleAuth();
    navigate('/');
    // try {
    //   const provider = new GoogleAuthProvider();
    //   const auth = getAuth(app);

    //   const result = await signInWithPopup(auth, provider);
    //   const idToken = await result.user.getIdToken();

    //   const res = await fetch('/api/auth/google', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       idToken: idToken,
    //     }),
    //   });

    //   // Handle the response from your backend
    //   if (res.ok) {
    //     const data = await res.json();
    //
    //     // Handle successful login/signup
    //     console.log('Authentication successful', data);
    //   } else {
    //     // Handle errors
    //     console.error('Authentication failed');
    //   }
    // } catch (error) {
    //   console.error('Error during Google sign-in:', error);
    // }
  };
  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        onClick={handleGoogleClick}
        className="hover:tracking-wide hover:scale-x-105 duration-300 mt-2 w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-red-600
						hover:to-red-700"
      >
        {isLoading ? (
          <div class="border-gray-300 size-8 mx-auto animate-spin rounded-full border-4 border-t-blue-600" />
        ) : (
          'google'
        )}
      </button>
      {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
    </>
  );
}
