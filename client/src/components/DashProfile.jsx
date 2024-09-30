import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ">
          <img
            className="w-full h-full rounded-full object-cover border-8 border-[lightgray]"
            src={currentUser.profilePicture}
            alt="user"
          />
        </div>
        <TextInput
          type="text"
          sizing="sm"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
         <TextInput
          type="text"
          sizing="sm"
          id="email"
          placeholder="username"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          sizing="sm"
          id="password"
          placeholder="password"
        
        />
       <Button type="text" gradientDuoTone="purpleToBlue" outline>update</Button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-800">Delete Account</span>
        <span className="text-red-800">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
