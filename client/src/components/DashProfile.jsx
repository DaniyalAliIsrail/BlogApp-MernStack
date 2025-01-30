import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingprogress, setimageFileUploadingprogress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  console.log(imageFileUploadingprogress, imageFileUploadError);
  const filePickerRef = useRef();
  // console.log(filePickerRef);

  // console.log(currentUser);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); //jo image upload k hay  uska url bana do
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read,
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches("image/.*")
    //     }
    //   }
    // }
    setImageFileUploadError(null);
    const storage = getStorage(app);//fbase storage initialize
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress)
        setimageFileUploadingprogress(progress.toFixed(0));
      },
      (error) => {
        console.error("Upload failed:", error);
        setImageFileUploadError(
          "Could not upload image (file must be less then 2MB)"
        );
        setimageFileUploadingprogress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downdloadURL) => {
          setImageFileUrl(downdloadURL);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
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
        <Button type="text" gradientDuoTone="purpleToBlue" outline>
          update
        </Button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-800">Delete Account</span>
        <span className="text-red-800">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
