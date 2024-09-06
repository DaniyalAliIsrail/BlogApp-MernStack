import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSucess,
  signInFailure,
} from "../redux/user/userSlice";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return dispatch(signInFailure("Required all the fileds"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      setFormData({ email: "", password: "" });
      if (res.ok) {
        dispatch(signInSucess(data));
        navigate("/");
      }
    } catch (error) {
      return dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col p-3 max-w-3xl mx-auto  md:items-center md:flex-row  gap-5 ">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl ">
            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 vis-purple-500 to-blue-500 rounded-lg text-white ">
              Tenzy
            </span>
            Blog
          </Link>
          <p className="mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            consequatur!
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="email"
                onChange={handleChange}
                id="email"
                placeholder="name@gmail.com"
                value={formData.email}
                required
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                onChange={handleChange}
                id="password"
                placeholder="password"
                value={formData.password}
                required
              />
            </div>
            <Button type="submit" gradientDuoTone="greenToBlue">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="text-sm mt-4">
            <span>
              Dont't hava an account ?{" "}
              <Link to="/signup" className="text-blue-500">
                singup
              </Link>
            </span>
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

export default Signin;
