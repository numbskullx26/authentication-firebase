import {app} from "@/providers/firebaseProvider";

import {
  faPenNib,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, signOut } from "firebase/auth";
import React from "react";

export default function Feeds() {

    const signOutuser = async ()=>{
        const auth = getAuth(app);
        signOut(auth).then(()=>{
            console.log("signout");

        })
    }

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex flex-col w-1/3 h-screen bg-black items-center justify-end p-5">
        <button className="rounded-full bg-white text-black w-fit px-4 py-2" onClick={()=>signOutuser()}>
          <FontAwesomeIcon icon={faRightFromBracket} className="px-" />
          Log Out
        </button>
      </div>
      <div className="flex flex-col w-1/3 h-screen bg-black border-l-2 border-r-2 border-gray-700">
        <div className="px-4 py-4 text-3xl font-bold w-full border-b-2 border-gray-700">
          Feeds
        </div>
      </div>
      <div className="flex flex-col w-1/3 h-screen bg-black "></div>
    </div>
  );
}
