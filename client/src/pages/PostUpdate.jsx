
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const PostUpdate = () => {
  const [file, setFile] = useState(null);
  const [imageuploadingProgress, setImageuplaodingProgress] = useState(null);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const { postId } = useParams();
  const naviagte = useNavigate();
  console.log("formdata id==>>",formData._id);
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser._id==>>",currentUser._id);

  useEffect(()=>{
    const fetchpost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?postId=${postId}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
        }
        if(res.ok){
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchpost();
  },[postId])
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
          setImageuplaodingProgress(null);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty content (handles HTML emptiness)
    // const isContentEmpty =
    //   !formData.content ||
    //   formData.content.replace(/<(.|\n)*?>/g, "").trim() === "";

    if (
      !formData.title ||
      !formData.category ||
      !formData.content // ||
      // !formData.imageUrl
    ) {
      setPublishError("Please fill in all required fields");
      return;
    }

    setPublishError(null);
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message)
      }
      if (res.ok) {
        setPublishError(null)
        setPublishSuccess("Post updated successfully");
        return
      }
    } catch (error) {
      setPublishError(error.message || "An error occurred.");
    }
  };
 
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-3xl text-center p-3">Update post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-center ">
          <TextInput
            type="text"
            placeholder="Enter Your Title"
            className="flex-1"
            id="title"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
          />
          <Select
            id="category"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
            value={formData.category || ""}
          >
            <option value="uncategorized">Select Category</option>
            <option value="javascript">Java Script</option>
            <option value="reactjs">React.js</option>
            <option value="nodejs">Node.js</option>
            <option value="expressjs">Express.js</option>
          </Select>
        </div>

        {/* <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dashed p-3">
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
        </div> */}


        {/* {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="upload Image"
            className="mb-8 object-cover h-72 w-full"
          />
        )} */}
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        <ReactQuill
          id="description"
          onChange={(value) => setFormData({ ...formData, content: value })}
          required
          className="h-72 mb-12"
          theme="snow"
          value={formData.content || ""}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          update Post
        </Button>
        {publishSuccess ?(<Alert color="success">{publishSuccess}</Alert>):null}
        {
          publishError && <Alert color="failure">{publishError}</Alert>
        }
      </form>
    </div>
  );
};




