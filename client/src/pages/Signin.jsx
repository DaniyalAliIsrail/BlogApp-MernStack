import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
const Signin = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:items-center md:flex-row  gap-5 ">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl ">
            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 vis-purple-500 to-blue-500 rounded-lg text-white ">
              Tenzy
            </span>
            Blog
          </Link>
          <p className="mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, consequatur!
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="username" />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="text" placeholder="password" />
            </div>
            <Button gradientDuoTone="greenToBlue" >SignIn</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signin;
