import React, { useEffect } from "react";
import RestaurantsList from "@/components/pages/RestaurantsList";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

const RestaurantsListPage = () => {
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

  return <RestaurantsList />;
};

export default RestaurantsListPage;
