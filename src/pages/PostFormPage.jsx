import { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import { UserContext } from "../UserContext";

const COHORT_NAME = "2302-acc-pt-web-pt-b";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function PostFormPage() {
  const { token, setToken } = useContext(UserContext);

  useEffect(() => console.log(token), []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            location,
            willDeliver,
          },
        }),
      });

      const result = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header token={token} />
      <form onSubmit={handleSubmit} className="p-4">
        <h1 className="text-3xl mb-4">Add New Post</h1>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="price"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="willDeliver"
            name="willDeliver"
            checked={willDeliver}
            onChange={() => setWillDeliver(!willDeliver)}
            className="mr-2"
          />
          <label
            htmlFor="willDeliver"
            className="text-sm font-medium text-gray-700"
          >
            Willing to deliver?
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Create
        </button>
      </form>
    </div>
  );
}
