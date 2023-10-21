"use client";

import SignInBtn from "@/components/signInBtn";
import SignUpBtn from "@/components/signUpBtn";
import { app } from "@/providers/firebaseProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
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
      <SignUpBtn />
    </>
  );
}

export default page;
