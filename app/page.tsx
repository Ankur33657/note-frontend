"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      router.push("/notes");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <h1>Loading...</h1>;
}
