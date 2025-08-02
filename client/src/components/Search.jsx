// import { TextInput } from "flowbite-react";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const Search = () => {
//   const [sidebarData, setSidebarData] = useState({
//     searchTerm: "",
//     sort: "desc",
//     category: "uncategorized",
//   });
//   console.log(sidebarData);
//   const [post, setPost] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showMore, setShowMore] = useState(false);
//   const location = useLocation();
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get("searchTerm");
//     const sortFromUrl = urlParams.get("sort");
//     const categoryFromUrl = urlParams.get("category");
//     if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
//       setSidebarData({
//         ...sidebarData,
//         searchTerm: searchTermFromUrl,
//         sort: sortFromUrl,
//         category: categoryFromUrl,
//       });
//     }
//     const searchQuery = urlParams.toString();
//     const fetchPost = async () => {
//       const res = await fetch(`/api/post/getpost?${searchQuery}`);
//       const data = await res.json();
//       console.log(data);
//       if (!res.ok) {
//         setLoading(false);
//         return;
//       }
//       if (res.ok) {
//         setPost(data);
//         setLoading(false);
//         if (data.post.length === 9) {
//           setShowMore(true);
//         } else {
//           setShowMore(false);
//         }
//       }
//     };
//     fetchPost();
//   }, [location.search]);
//   const handleChange = (e) => {
//     if (e.target.id === "searchTerm") {
//       setSidebarData({
//         ...sidebarData,
//         searchTerm: e.target.value,
//       });
//     }
//     if(e.target.id == "sort"){
//       const order = e.target.value || 'desc';
//        setSidebarData({
//         ...sidebarData,
//         sort: order,
//       });
//     }

//     if(e.target.id == "category"){
//       const category = e.target.value || 'uncategorized';
//        setSidebarData({
//         ...sidebarData,
//         category
//       });
//     }
//     }
//   };
//   return (
//     <div>
//       <div>
//         <form>
//           <div>
//             <label>Search Term :</label>
//             <TextInput
//               onChange={handleChange}
//               value={sidebarData.searchTerm}
//               id="searchTerm"
//               placeholder="search..."
//               type="text"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );

// export default Search;

import { TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm"); // fixed typo: "seachTerm"
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prev) => ({
        ...prev,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      }));
    }

    const searchQuery = urlParams.toString();

    const fetchPost = async () => {
      setLoading(true);
      const res = await fetch(`/api/post/getpost?${searchQuery}`);
      const data = await res.json();
      console.log(data);

      setLoading(false);
      if (res.ok) {
        setPost(data.post || []);
        setShowMore(data.post && data.post.length === 9);
      }
    };

    fetchPost();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({
        ...sidebarData,
        sort: order,
      });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({
        ...sidebarData,
        category,
      });
    }
  };

  return (
    <div>
      <div>
        <form>
          <div>
            <label>Search Term :</label>
            <TextInput
              onChange={handleChange}
              value={sidebarData.searchTerm}
              id="searchTerm"
              placeholder="search..."
              type="text"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
