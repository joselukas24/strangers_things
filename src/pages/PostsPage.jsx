import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { UserContext } from "../UserContext";

const COHORT_NAME = "2302-acc-pt-web-pt-b";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          headers: token ? { Authorization: `Bearer ${token.token}` } : {},
        });
        const result = await response.json();
        console.log(result);
        setPosts(result.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [token]);

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

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        // Post is successfully deactivated. Update UI accordingly.
        // For instance, you can remove the post from the list or mark it as inactive.
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (postId, content) => {
    try {
      // Ensure both postId and content are provided
      if (!postId || !content) {
        console.error("Post ID and content are required");
        return;
      }

      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`, // Assuming `token` is available in scope
        },
        body: JSON.stringify({
          message: {
            content: content,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Message sent successfully", result.data.message);
        return result.data.message;
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header token={token} />
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="p-2 border rounded-md"
          />
          {token && (
            <Link
              to="/post-form"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create Post
            </Link>
          )}
        </div>
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

            {/* Delete Button */}
            {post.isAuthor && (
              <button
                onClick={() => deletePost(post._id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md mt-2"
              >
                Delete Post
              </button>
            )}

            {/* Messages Form */}
            {!post.isAuthor && token && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(post._id, e.target.message.value);
                }}
                className="mt-2"
              >
                <input
                  type="text"
                  name="message"
                  placeholder="Send a message"
                  required
                  className="p-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                >
                  Send
                </button>
              </form>
            )}

            {/* Displaying Messages if the user is the author */}
            {post.isAuthor && post.messages.length > 0 && (
              <div className="mt-2">
                <strong>Messages:</strong>
                <ul>
                  {post.messages.map((msg, index) => (
                    <li key={index} className="text-sm">
                      {msg.fromUser.username}: {msg.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
