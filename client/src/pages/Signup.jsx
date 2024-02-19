import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5 ">
      <div className="flex-1 ">
        <Link
          to="/"
          className="font-bold dark:text-white text-4xl "
        >
          <span className="px-2 py-1 bg-gradient-to-r from-purple-500 vis-purple-500 to-blue-500 rounded-lg text-white ">
            Tech
          </span>
          Blog
        </Link>
        <p className="mt-5">
          Lorem ipsum dolor sit amet nsectetur adipisicing elit Lorem, ipsum dolor..
        </p>
      </div>
      <div className="flex-1">
        <form className="flex flex-col gap-4">
          <div>
            <Label value="your username" />
            <TextInput type="text" placeholder="username" id="username" />
          </div>

          <div>
            <Label value="your email" />
            <TextInput type="email" placeholder="name@gmail.com" id="email" />
          </div> 

          <div>
            <Label value="your username" />
            <TextInput type="password" placeholder="password" id="password" />
          </div>
         <Button gradientDuoTone='purpleToBlue' type="submit ">
          Signup
         </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link to="/signin" className="text-blue-500">
            Signin
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
