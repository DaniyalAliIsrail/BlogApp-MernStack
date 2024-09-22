import { Button } from "flowbite-react";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import React from "react";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const OAuth = () => {
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleFacebookClick = async () => {
  //   const provider = new FacebookAuthProvider();
  //   try {
  //     const fbauth = await signInWithPopup(auth, provider);
  //     console.log(fbauth);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

      <Button
        type="button"
        gradientDuoTone="greenToBlue"
        outline
        onClick={handleFacebookClick}
      >
        <AiFillFacebook className="w-6 h-5 mr-2" />
        Continue with Facebook
      </Button>
    </>
  );
};

export default OAuth;
