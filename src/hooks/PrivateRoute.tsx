"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/Store";

const PrivateRoute = ({ children }: any) => {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      // Redirect to login if not authenticated
      router.push("/login");
    }
  }, [token, router]);

  return <>{children}</>;
};

export default PrivateRoute;
