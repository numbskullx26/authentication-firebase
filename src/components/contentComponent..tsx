import { app } from "@/providers/firebaseProvider";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

export default function ContentComponent() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user: any) => {
      const allPosts = await axios.get(`http://localhost:8080/getAllPosts`);
      console.log(allPosts);
      setContents(allPosts.data);
    });
  };

  return (
    <div>
      {contents.map((content) => {
        return (
          <div className="flex flex-col rounded-sm my-6">
            <div className="w-full flex flex-col px-5 py-3">
              {/* <h1 className="text-white-1 font-sans font-strongbold text-xl">Username: </h1> */}
              <div className="flex flex-col">
                <h1 className="text-white-600 font-sans font-bold text-xl px-1 py-4">
                  {content?.username}
                </h1>
                <div className="flex flex-row bg-white text-black font-sans font-bold rounded-full border border-4 border-gray-700 px-5 py-8 my-4 justify-center">
                  {content?.post}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
