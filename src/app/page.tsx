"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { app } from "../providers/firebaseProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Homepage from "@/pages/homepage";
import Feeds from "@/pages/feeds";

export default function Home() {
  useEffect(() => {
    checkUserAuth();
  }, []);

  const [signedIn, setSignedIn] = useState(false);
  const checkUserAuth = async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {signedIn ? <Feeds /> : <Homepage />}
    </main>
  );
}
