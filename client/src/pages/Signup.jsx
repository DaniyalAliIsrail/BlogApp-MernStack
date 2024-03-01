import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData,setFormData ] = useState({})
  console.log(formData);

  const handleChange = (e) =>{
    setFormData({...formData , [e.target.id]: e.target.value});
  }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const res = await fetch("/api/auth/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body:JSON.stringify(formData),
//         });

//         if (!res.ok) {
//             throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };


  const handleSubmit = async (e) =>{
    e.preventDefault();
      try{
      const res = await fetch("/api/auth/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      }catch(error){
        console.log(error);
      }
    }
  

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:items-center md:flex-row gap-5 ">
     {/* flex-1 create a equal space  */}
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="your username" />
            <TextInput type="text" id="username"   onChange={handleChange} placeholder="username"  />
          </div>

          <div>
            <Label value="your email" />
            <TextInput type="email" onChange={handleChange} placeholder="name@gmail.com" id="email" />
          </div> 

          <div>
            <Label value="your username" />
            <TextInput type="password" onChange={handleChange} placeholder="password" id="password" />
          </div>
         <Button gradientDuoTone='purpleToBlue' type="submit ">
          Signup
         </Button>
        </form>
        <div className="flex gap-1 text-sm mt-5">
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
