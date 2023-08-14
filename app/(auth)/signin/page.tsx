"use client"
import {useEffect, useState} from "react"
import SignIn from "@/components/signin";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  useEffect(() => {
    setIsMounted(true);
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isMounted) {
    return <p>Loading...</p>;
  }

  return <SignIn />;
}