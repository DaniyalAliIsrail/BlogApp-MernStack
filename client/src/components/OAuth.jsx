import { Button } from "flowbite-react";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import React from "react";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase";
import { signInFailure, signInSucess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle.user.displayName);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSucess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  };

  const handleFacebookClick = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const fbauth = await signInWithPopup(auth, provider);
      console.log(fbauth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        type="button"
        gradientDuoTone="greenToBlue"
        outline
        onClick={handleGoogleClick}
      >
        <AiFillGoogleCircle className="w-6 h-5 mr-2" />
        Continue with Google
      </Button>

      {/* <Button
        type="button"
        gradientDuoTone="greenToBlue"
        outline
        onClick={handleFacebookClick}
      >
        <AiFillFacebook className="w-6 h-5 mr-2" />
        Continue with Facebook
      </Button> */}
    </>
  );
};

export default OAuth;
