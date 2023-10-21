import React from "react";
import { useRouter } from "next/navigation";

export default function Homepage() {

    const router = useRouter();

    const handleClick =(redirect:string)=>{
        router.push(`/${redirect}`);
    }

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex flex-col w-1/2 h-screen bg-blue-900 items-center justify-center">
        Threads
      </div>
      <div className="flex flex-col w-1/2 h-screen items-center justify-center bg-white ">
        <button onClick={()=>handleClick('signin')} className="text-blue-900 px-4 py-2 my-3 border-2 border-blue-900 rounded-full font-medium text-xl">
          Sign In
        </button>
        <button onClick={()=>handleClick('signup')} className="text-blue-900 px-4 py-2 my-3 border-2 border-blue-900 rounded-full font-medium text-xl">
          Sign Up
        </button>
      </div>
    </div>
  );
}
