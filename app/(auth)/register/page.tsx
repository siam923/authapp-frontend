"use client"
import {useEffect, useState} from "react"
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth";
import Register from "@/components/register";

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

  return <Register />;
}