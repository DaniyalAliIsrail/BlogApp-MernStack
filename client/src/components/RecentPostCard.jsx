import { Link } from "react-router-dom";

export const PostCard = ({postconent}) => {
  return (
    <div className="group relative h-[355px] overflow-hidden ">
      <Link>
        <img src={postconent.image} alt={postconent.title} className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300" />
      </Link>
      <div className="flex flex-col gap-2 pt-2 px-2 mb-4" >
         <p className="text-lg font-semibold line-clamp-2">{postconent.title}</p>
         <span className="text-sm italic ">{postconent.category}</span>
         <Link className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-400 text-teal-500 hover:text-gray-400 transition-all duration-300 p-2 mx-2 my-2 rounded text-center" to={`/post/${postconent.slug}`}>
         Read Articles
         </Link>
      </div>
    </div>
  );
};
