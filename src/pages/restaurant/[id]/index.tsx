// pages/RestaurantDetails.tsx
import React, { useEffect } from "react";
import RestaurantDetails from "@/components/pages/RestaurantDetails";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

const RestaurantDetailsPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <RestaurantDetails />;
};

export default RestaurantDetailsPage;
