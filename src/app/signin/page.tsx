"use client";

import React, { useEffect } from "react";
import SignInBtn from "@/components/signInBtn";
import GoogleSignInBtn from "@/components/googleSignInBtn";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/providers/firebaseProvider";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  };
  return (
    <>
      <SignInBtn />
      <GoogleSignInBtn />
    </>
  );
};

export default page;
