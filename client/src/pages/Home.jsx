import React, { useEffect, useState } from 'react';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getpost');
        const data = await res.json();
        console.log('API Response:', data);
        setAllPosts(data.posts);
        // setAllPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts:', error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {allPosts.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No posts available.</p>
      ) : (
        allPosts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 mb-1">Category: {post.category}</p>
              <p className="text-gray-700 text-sm mb-3">{stripHtml(post.content)}</p>
              <p className="text-xs text-gray-400">Created: {new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
