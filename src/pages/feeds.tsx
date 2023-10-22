import { app } from "@/providers/firebaseProvider";

import {
  faPenNib,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Feeds() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user: any) => {
      setEmail(user?.email);
      const result = await axios.get(`http://localhost:8080/getUser/${user?.email}`);
      console.log(result)
      setUsername(result.data[0].username);
    });
  };

  const signOutuser = async () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      console.log("signout");
    });
  };

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex flex-col w-1/3 h-screen bg-black items-center justify-end p-5">
        <button
          className="rounded-full bg-white text-black w-fit px-4 py-2"
          onClick={() => signOutuser()}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="px-" />
          Log Out
        </button>
      </div>
      <div className="flex flex-col w-1/3 h-screen bg-black border-l-2 border-r-2 border-gray-700">
        <div className="px-4 py-4 text-3xl font-bold w-full border-b-2 border-gray-700">
          Feeds
        </div>
        <label className="">{username}</label>
      </div>
      <div className="flex flex-col w-1/3 h-screen bg-black "></div>
    </div>
  );
}
