"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }: any) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == "") {
      // Redirect to login if not authenticated
      router.push("/login");
    }
  });

  return <>{children}</>
};

export default PrivateRoute;
