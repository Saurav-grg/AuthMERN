import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
export default function Oauth() {
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      //   console.log(data);
      //   dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not login with google', error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="hover:tracking-wide hover:scale-x-105 duration-300 mt-2 w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-red-600
						hover:to-red-700"
    >
      Google
    </button>
  );
}
