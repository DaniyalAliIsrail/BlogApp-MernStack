import { TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PostCard } from "./RecentPostCard";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm") || "";
    const sortFromUrl = urlParams.get("sort") || "desc";
    const categoryFromUrl = urlParams.get("category") || "uncategorized";

    setSidebarData({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });

    const fetchPost = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      console.log("Search Query:", searchQuery);
      const res = await fetch(`/api/post/getpost?${searchQuery}`);
      const data = await res.json();
      // console.log(data, post[0]);
      setLoading(false);
      if (res.ok) {
        setPost(data.posts || []);
        setShowMore(data.posts && data.posts.length === 9);
      }
    };

    fetchPost();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    // if (sidebarData.searchTerm.trim() !== "") {
    //   params.set("searchTerm", sidebarData.searchTerm);
    // }
    params.set("searchTerm", sidebarData.searchTerm);
    params.set("order", sidebarData.sort);
    params.set("category", sidebarData.category);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-200 ">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label>Search Term :</label>
            <TextInput
              onChange={handleChange}
              value={sidebarData.searchTerm}
              id="searchTerm"
              placeholder="search..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              id="sort"
              value={sidebarData.sort}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <select
              onChange={handleChange}
              id="category"
              value={sidebarData.category}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="reactjs">React</option>
              <option value="nodejs">Node</option>
              <option value="nextjs">Next</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Apply Filters
          </button>
        </form>
      </div>

      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && post.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            post &&
            post.map((p) => <PostCard key={p._id} postconent={p} />)}
          {showMore && (
            <button className="text-teal-500 text-lg hover:underline p-7 w-full">
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
