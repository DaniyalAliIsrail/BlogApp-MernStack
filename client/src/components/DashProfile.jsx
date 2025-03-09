import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteFailure,
  deleteSuccess,
  signOutSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

const DashProfile = () => {
  const { currentUser,error,loading} = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingprogress, setimageFileUploadingprogress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading100percent, setImageFileUploading100percent] =
  useState(false);
  const [updateuserSuccess, setupdateuserSuccess] = useState(null);
  const [updateUserError, setupdateUserError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleDel = async () => {
    setOpenModal(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        // console.log("Signout Success")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // Create a URL for the uploaded image
    }
  };

  const handleChange = (e) => {
    setupdateUserError(null);
    setupdateuserSuccess(null);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (updateUserError) {
      const timer = setTimeout(() => {
        setupdateUserError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (updateuserSuccess) {
      const timer = setTimeout(() => {
        setupdateuserSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updateUserError, updateuserSuccess]);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading100percent(true); // Set uploading state to true
    setImageFileUploadError(null);

    const storage = getStorage(app); // Initialize Firebase storage
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileUploadingprogress(progress.toFixed(0)); // Update progress
      },
      (error) => {
        console.error("Upload failed:", error);
        setImageFileUploadError(
          "Could not upload image (file must be less than 2MB)"
        );
        setimageFileUploadingprogress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading100percent(false); // Reset uploading state
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading100percent(false); // Reset uploading state after completion
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image is still uploading
    if (imageFileUploading100percent) {
      console.log(imageFileUploading100percent);
      setupdateUserError("Please wait while the image is uploading...");
      return;
    }
    if (Object.keys(formData).length === 0) {
      setupdateUserError("No changes detected");
      console.log("Form data is empty");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Update failed:", data.message);
        dispatch(updateFailure(data.message));
        setupdateUserError(data.message);
      } else {
        console.log("Update successful:", data);
        dispatch(updateSuccess(data));
        setupdateuserSuccess("User profile updated successfully");
        setFormData({});
      }
    } catch (error) {
      console.error("Network error:", error.message);
      dispatch(updateFailure("Failed to update user. Please try again."));
      setupdateUserError(error.message);
    }
  };

  return (
    <div className="max-w-lg  mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingprogress && (
            <CircularProgressbar
              value={imageFileUploadingprogress || 0}
              text={`${imageFileUploadingprogress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: "100",
                },
                path: {
                  stroke: `rgba(62,152,199, ${
                    imageFileUploadingprogress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`w-full h-full rounded-full object-cover border-8 border-[lightgray] ${
              imageFileUploadingprogress &&
              imageFileUploadingprogress < 100 &&
              "opacity-55"
            }`}
          />
        </div>

        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          sizing="sm"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          sizing="sm"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          sizing="sm"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" disabled={ loading ||imageFileUploading100percent} outline>
          {loading ?  'Loading.....' : 'update'}
        </Button>
        {currentUser?.isAdmin && (
          <Link to={'/create-post'} >
          <Button gradientDuoTone="purpleToPink" className="w-full">
            Create Post
          </Button>
          </Link>
        )}
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={() => setOpenModal(true)} className="text-red-800">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-800">
          Sign Out
        </span>
      </div>

      {updateuserSuccess && <Alert color="success">{updateuserSuccess}</Alert>}
      {updateUserError && <Alert color="failure">{updateUserError}</Alert>}

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="z-[200]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Account
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDel} color="failure">
                Delete
              </Button>
              <Button onClick={() => setOpenModal(false)} color="gray">
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default DashProfile;
