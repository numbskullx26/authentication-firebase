"use client";

import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/providers/firebaseProvider";
import React, { useEffect, useState } from "react";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user: any) => {
      const userdata = await axios.get(
        `http://localhost:8080/getUser/${user?.email}`
      );
      console.log(userdata);
      setUsername(userdata.data[0].username);
    });
  };

  const userContent = async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user) => {
      const post = await axios.post("http://localhost:8080/createPost", {
        username: `${username}`,
        content: `${content}`,
      });
      console.log(post);
    });
  };
  return (
    <div className="flex flex-col w-full h-fit bg-white-100">
      <input
        type="text"
        className="text-black font-md py-2 px-3 rounded-none"
        placeholder="Create your post"
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <div className="flex flex-row justify-end">
        <button
          className="text-black rounded-full w-fit bg-white px-5 my-3 mx-3 py-2"
          onClick={userContent}
        >
          Post
        </button>
      </div>
    </div>
  );
}
