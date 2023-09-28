import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import Header from "../components/Header";

const COHORT_NAME = "2302-acc-pt-web-pt-b";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function ProfilePage() {
  const { token, setToken } = useContext(UserContext);
  const [userData, setUserData] = useState({ posts: [], messages: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });
        const result = await response.json();
        console.log(result.data.posts);
        if (
          result.success === true &&
          result.data.posts &&
          result.data.messages
        ) {
          setUserData({
            posts: result.data.posts,
            messages: result.data.messages,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="posts-section">
        <h2>Your Posts</h2>
        {userData.posts &&
          userData.posts.map((post) => (
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
                <strong>Location:</strong> {post.location}
              </p>
            </div>
          ))}
      </div>

      <div className="messages-section">
        <h2>Your Messages</h2>
        {userData.messages &&
          userData.messages.map((message) => (
            <div
              key={message._id}
              className="bg-white p-6 rounded-md mb-4 shadow-md"
            >
              <h2 className="text-sm mb-2">
                From: {message.fromUser.username}
              </h2>
              <p className="text-sm mb-1">
                <strong>Content:</strong> {message.content}
              </p>
              <p className="text-sm mb-1">
                <strong>Regarding Post:</strong> {message.post.title}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
