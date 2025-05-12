import { Button } from "flowbite-react";
import banner from "../assets/Banner (1).png";

export const CallToAction = () => {
  return (
  
      <div className="flex flex-col sm:flex-row justify-between items-center text-center  border border-teal-500 rounded-tl-3xl rounded-br-3xl  ">
        <div className="flex-1 justify-center items-center flex flex-col gap-3 p-2">
          <h1 className=" text-2xl font-semibold">
            Want to learn more about javascript
          </h1>
          <p className="font-semibold">
            Check our 100 js Projects website and start building your own
            projects
          </p>
          <Button
            className="w-full rounded-tl-none rounded-br-none"
            gradientDuoTone="purpleToPink"
          >
            <a href="https://www.youtube.com/watch?v=lkIFF4maKMU" target="_blank" rel="noopener noreferrer">JavaScript</a>
          </Button>
        </div>
        <div className="p-7 flex-1">
          <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1024,q_auto" />
        </div>
      </div>
  
  );
};
