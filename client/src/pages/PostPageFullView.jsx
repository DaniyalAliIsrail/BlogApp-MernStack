import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostPageFullView = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController(); //kam ko roknay ka controller
    
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?slug=${postSlug}`, {
          signal: abortController.signal
        });
        const data = await res.json();
        setPost(data.posts[0]);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
    
    return () => abortController.abort();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Post load nahi ho saka</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="max-w-3xl mx-auto p-3 min-h-screen">
      <h1 className="text-3xl text-center font-serif max-w-2xl mx-auto p-3 lg:text-4xl">
        {post?.title}
      </h1>
      
      <Link to={`/search?category=${post.category}`}>
        <Button color="gray" pill size={"xs"} className="mx-auto block my-2">
          {post?.category}
        </Button>
      </Link>
      
      {post.image && (
        <img
          src={post?.image}
          alt={post?.title}
          className="w-full object-cover max-h-[600px mt-5]"
        />
      )}
      
      <div className="flex justify-between items-center my-2 text-gray-500 border-b-2 border-gray-200 w-full">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{(post.content.replace(/<[^>]*>/g, "").length / 1000).toFixed(0)} mins read</span>
      </div>
      
      <div 
        className="pt-5 pb-4 post-content" 
        dangerouslySetInnerHTML={{__html: post.content}}
      />
    </main>
  );
};

export default PostPageFullView;