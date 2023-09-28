import { useEffect, useState } from "react";
import Header from "../components/Header";

const COHORT_NAME = "2302-acc-pt-web-pt-b";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function PostsPage({ token }) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`);
        const result = await response.json();
        setPosts(result.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const searchString = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchString) ||
      post.description.toLowerCase().includes(searchString) ||
      post.price.toLowerCase().includes(searchString) ||
      post.author.username.toLowerCase().includes(searchString) ||
      post.location.toLowerCase().includes(searchString)
    );
  });

  return (
    <div>
      <Header token={token} />
      <div className="max-w-screen-xl mx-auto p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="p-2 mb-4 border rounded-md"
        />
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-md mb-4 shadow-md"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-sm mb-1">
              <strong>Description:</strong> {post.description}
            </p>
            <p className="text-sm mb-1">
              <strong>Price:</strong> {post.price}
            </p>
            <p className="text-sm mb-1">
              <strong>Seller:</strong> {post.author.username}
            </p>
            <p className="text-sm">
              <strong>Location:</strong> {post.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
