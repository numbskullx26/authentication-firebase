"use client";
import React from "react";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "@/providers/firebaseProvider";
import { useRouter } from "next/navigation";

export default function GoogleSignInBtn() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <button
      className="rounded-full bg-purple-700 text-white-1 font-md"
      onClick={handleGoogleSignIn}
    >
      SignIn with Google
    </button>
  );
}
