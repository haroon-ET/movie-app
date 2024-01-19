"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
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
