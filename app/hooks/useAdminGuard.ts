"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./user/useUser";

export const useAdminGuard = () => {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  console.log(user);
  console.log(user?.role);

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "ADMIN") {
        router.replace("/");
      }
    }
  }, [user, isLoading, router]);

  return { isLoading: isLoading || !user || user.role !== "ADMIN" };
};
