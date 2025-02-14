import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageuploadingProgress, setImageuplaodingProgress] = useState(null);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  console.log(formData);

  const handleImageChange = () => {
    try {
      if (!file) {
        setimageUploadError("Please select the Image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageuplaodingProgress(progress.toFixed(0));
        },
        (error) => {
          console.log(error);
          setImageProgress(null);
          setimageUploadError("Failed to upload the Image");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageuplaodingProgress(null);
            setimageUploadError(null);
            setFormData({ ...formData, imageUrl: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log(error);
      setImageProgress(null);
      setimageUploadError(error);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-3xl text-center p-3">Create post</h1>

      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-center ">
          <TextInput
            type="text"
            placeholder="Enter Your Title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select Category</option>
            <option value="javascript">Java Script</option>
            <option value="reactjs">React.js</option>
            <option value="nodejs">Node.js</option>
            <option value="expressjs">Express.js</option>
          </Select>
        </div>
       
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dashed p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="sm:flex-1"
          />

          <Button
            type="button"
            size="sm"
            outline
            gradientDuoTone="purpleToBlue"
            onClick={handleImageChange}
          >
            {imageuploadingProgress ? (
              <div className="w-12 h-12">
                <CircularProgressbar
                  value={imageuploadingProgress}
                  text={`${imageuploadingProgress || 0}%`}
                  styles={{
                    path: {
                      stroke: `rgba(13, 17,161, ${
                        imageuploadingProgress / 100
                      })`,
                    },
                  }}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {
          formData.imageUrl && (
            <img src={formData.imageUrl}   alt="upload Image" className="mb-8 object-cover h-72 w-full"/>
          
          )
        }
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        <ReactQuill required className="h-72 mb-12" theme="snow" />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};
