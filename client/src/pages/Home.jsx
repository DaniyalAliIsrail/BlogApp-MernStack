import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostCard } from "../components/RecentPostCard";
const Home = () => {
  const [post, setPost] = useState([]);
  console.log(post.posts);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/post/getpost?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPost(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);
  return (
    <div className="bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-800  dark:to-gray-800 ">
      <div className="flex w-full flex-col items-center justify-center text-center px-4 py-20 ">
        <h1 className="mx-auto sm:max-w-full md:max-w-4xl lg:max-w-4xl font-display  font-bold tracking-normal text-white-300 dark:text-gray-300 text-[2.3rem] sm:4xl md:text-7xl lg:text-7xl">
          Manage & Grow
          <span className="relative whitespace-nowrap text-white-600 dark:text-gray-200">
            Your
          </span>
          <span className="relative whitespace-nowrap text-orange-500 dark:text-orange-400 text-3xl sm:text-5xl md:text-5xl lg:text-6xl">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-500 dark:fill-orange-200"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>

            <span className="relative">Blog Effortlessly</span>
          </span>
        </h1>
        <h2 className="mx-auto mt-8 max-w-xl text-lg sm:text-white-400 text-white-500 dark:text-gray-300 leading-7">
          Powerful Blog Application with a User-Friendly Admin Panel Create
          stunning posts, manage content, and engage your audience like never
          before.
        </h2>
        <Link
          className="rounded-full border px-4 py-1 mt-2 hover:bg-white hover:text-black"
          to="/search"
        >
          search
        </Link>
      </div>
      {/* Recent post */}

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-3xl px-4 text-center">
          Recent Posts
        </h2>
         </div>
        <div className="flex flex-col items-center px-4 py-6  mx-auto ">
          <div className="flex flex-wrap justify-center gap-6 w-full ">
            {post &&
              post.posts?.map((post) => (
                <div
                  key={post._id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-b-4  border-teal-400 rounded  "
                >
                  <PostCard postconent={post} />
                </div>
              ))}
          </div>
        </div>
     
    </div>
  );
};

export default Home;
