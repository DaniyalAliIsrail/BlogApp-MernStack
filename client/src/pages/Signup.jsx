    import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      
      setErrorMessage(null); 
      setFormData({ username: "", email: "", password: "" }); // Clear input fields
      if(res.ok){
        navigate('/signin')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
      setFormData({ username: "", email: "", password: "" }); // Clear input fields

    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:items-center md:flex-row gap-5 ">
        <div className="flex-1 ">
          <Link to="/" className="font-bold dark:text-white text-4xl ">
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 vis-purple-500 to-blue-500 rounded-lg text-white ">
              Denzy
            </span>
            Blog
          </Link>
          <p className="mt-5">
            Lorem ipsum dolor sit amet nsectetur adipisicing elit Lorem, ipsum
            dolor...
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                id="username"
                onChange={handleChange}
                placeholder="Username"
                value={formData.username}
              />
            </div>

            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                onChange={handleChange}
                placeholder="name@gmail.com"
                id="email"
                value={formData.email}
              />
            </div>

            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                onChange={handleChange}
                placeholder="Password"
                id="password"
                value={formData.password}
              />
            </div>
            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3" > loading... </span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-1 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Signin
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 " color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
