// import React from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate} from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';


export default function GoogleAuth() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
  
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      // console.log(result.user.displayName, result.user.email, result.user.photoURL);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({
          name : result.user.displayName,
          email : result.user.email,
          photo : result.user.photoURL
        })
      });
      const data = res.json();
      dispatch(signInSuccess(data));
      // console.log(data);
      // navigate('/');

    } catch (error) {
      dispatch(signInFailure('Could not signin to google',error))
    }
  }

  return (
    <div>
      <button onClick={handleGoogleAuth} className="bg-red-700 mt-3 rounded-lg p-3 text-gray-100 font-semibold uppercase hover:opacity-90" style={{width:'100%'}}>Continue with google</button>
    </div>
  )
}